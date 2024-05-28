#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform sampler2D Texture2;
uniform sampler2D Texture3;
uniform vec2 TextureSize;   // this is really 1/size

void main()
{
    // gl_FragCoord goes from [0,size]
    vec4 texColor = texture2D(Texture, gl_FragCoord.xy*TextureSize);
    
    vec4 tex1 = texture2D(Texture, gl_FragCoord.xy*TextureSize);
    vec4 tex2 = texture2D(Texture2, gl_FragCoord.xy*TextureSize);
    vec4 tex3 = texture2D(Texture3, gl_FragCoord.xy*TextureSize);

    // mix the textures
    vec4 mix1 = mix(tex1, tex2, 0.5);
    vec4 mix2 = mix(tex2, tex3, 0.5);
    vec4 mix3= mix(tex1, mix2, 0.5);
    
    float y = gl_FragCoord.y*TextureSize.y;
    
    // clamp the gray
    float grayClamp = 0.6;
    
    float r = clamp(mix1.x, 0.0, grayClamp);
    float g = clamp(mix1.y, 0.0, grayClamp);
    float b = clamp(mix1.z, 0.0, grayClamp);
    
    vec4 finalColor = vec4(r,g,b,mix1.a); 
    gl_FragColor = finalColor;
}
