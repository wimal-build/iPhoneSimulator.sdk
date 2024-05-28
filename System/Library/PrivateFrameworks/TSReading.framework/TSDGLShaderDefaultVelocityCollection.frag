// Default Velocity Collection Fragment Shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D Texture;
uniform sampler2D VelocityTexture;
uniform vec2 VelocityScale;

#if SAMPLE_COUNT > 1
const vec4 sample1 = vec4(1.0, 1.0, -1.0, -1.0);
#if SAMPLE_COUNT > 3
const vec4 sample2 = vec4(0.5, 0.5, -0.5, -0.5);
#if SAMPLE_COUNT > 5
const vec4 sample3 = vec4(.25, .25, -.25, -.25);
#if SAMPLE_COUNT > 7
const vec4 sample4 = vec4(.75, .75, -.75, -.75);
#endif
#endif
#endif
#endif

const float kSampleCountAdjust =
#if SAMPLE_COUNT == 1
1.0;
#elif SAMPLE_COUNT == 2
0.5;
#elif SAMPLE_COUNT == 3
0.3333333333;
#elif SAMPLE_COUNT == 4
0.25;
#elif SAMPLE_COUNT == 5
0.2;
#elif SAMPLE_COUNT == 6
0.1666666667;
#elif SAMPLE_COUNT == 7
0.1428571429;
#elif SAMPLE_COUNT == 8
0.125;
#elif SAMPLE_COUNT == 9
0.1111111111;
#else
0.0; // ERROR CONDITION!
#endif

varying vec2 v_TexCoord;

float randomAmount(vec2 seed) {
    float randAmt = fract(sin(dot(seed.xy, vec2(12.9898,78.233))) * 43758.5453);
    return 0.9 + 0.2*randAmt;
}

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord.xy);
    vec4 velocity = texture2D(VelocityTexture, v_TexCoord.xy);
    
    float sampleCount = 1.0;
    float sampleScale = 1.0; //randomAmount(v_TexCoord.xy);
    
    if (velocity.z != 0.0) {
        /* Only sample if we have an actual velocity! */
        
        /* Account for blur from previous step by adjusting velocity lengths */
        velocity.xy /= velocity.z;
        
        /* Remap from [0,1] to [-1,1] */
        velocity.xy = velocity.xy*2.0 - vec2(1);
        
        /* If we're on the very edge of the blur, make this zero */
        velocity.xy = (abs(velocity.z)<0.05) ? vec2(0) : velocity.xy;
        
        /* Remap from pixel to texture coords and apply VelocityScale */
        vec4 veloCoord = (velocity.xy * VelocityScale).xyxy;
        
        vec4 coord;
        
        /* 1 */
#if SAMPLE_COUNT > 1
        coord = veloCoord * sample1 * sampleScale + v_TexCoord.xyxy;
        color += texture2D(Texture, coord.xy);
#if SAMPLE_COUNT > 2
        color += texture2D(Texture, coord.zw);
        
        /* 2 */
#if SAMPLE_COUNT > 3
        coord = veloCoord * sample2 * sampleScale + v_TexCoord.xyxy;
        color += texture2D(Texture, coord.xy);
#if SAMPLE_COUNT > 4
        color += texture2D(Texture, coord.zw);
        
        /* 3 */
#if SAMPLE_COUNT > 5
        coord = veloCoord * sample3 * sampleScale + v_TexCoord.xyxy;
        color += texture2D(Texture, coord.xy);
#if SAMPLE_COUNT > 6
        color += texture2D(Texture, coord.zw);
        
        /* 4 */
#if SAMPLE_COUNT > 7
        coord = veloCoord * sample4 * sampleScale + v_TexCoord.xyxy;
        color += texture2D(Texture, coord.xy);
#if SAMPLE_COUNT > 8
        color += texture2D(Texture, coord.zw);
        
#endif // #if SAMPLE_COUNT > 8
#endif // #if SAMPLE_COUNT > 7
#endif // #if SAMPLE_COUNT > 6
#endif // #if SAMPLE_COUNT > 5
#endif // #if SAMPLE_COUNT > 4
#endif // #if SAMPLE_COUNT > 3
#endif // #if SAMPLE_COUNT > 2
#endif // #if SAMPLE_COUNT > 1
        
    }
    
    gl_FragColor = color * kSampleCountAdjust;
    /* DEBUGGING: */
    //gl_FragColor = vec4(velocity.xy, 0,1);
    
#if SAMPLE_COUNT == 0
    // Drawing entirely red? Try setting the SAMPLE_COUNT
    gl_FragColor = vec4(1,0,0,1);
#endif
}
