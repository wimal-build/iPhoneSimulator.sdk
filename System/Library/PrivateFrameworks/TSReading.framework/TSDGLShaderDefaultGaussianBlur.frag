// Default Gaussian Blur Fragment Shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D Texture;
uniform vec2 TextureSize;

#if IS_HORIZONTAL
const vec2 offset1 = vec2(1.3846153846, 0);
const vec2 offset2 = vec2(3.2307692308, 0);
#else
const vec2 offset1 = vec2(0, 1.3846153846);
const vec2 offset2 = vec2(0, 3.2307692308);
#endif
const float weight0 = 0.2270270270;
const float weight1 = 0.3162162162;
const float weight2 = 0.0702702703;

void main()
{
    vec4 color = texture2D(Texture, gl_FragCoord.xy*TextureSize) * weight0;
    
    color += texture2D(Texture, (gl_FragCoord.xy + offset1)*TextureSize) * weight1;
    color += texture2D(Texture, (gl_FragCoord.xy - offset1)*TextureSize) * weight1;
    
    color += texture2D(Texture, (gl_FragCoord.xy + offset2)*TextureSize) * weight2;
    color += texture2D(Texture, (gl_FragCoord.xy - offset2)*TextureSize) * weight2;
    
    gl_FragColor = color;
}
