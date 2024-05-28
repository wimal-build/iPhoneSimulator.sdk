// Default Uniform Motion Blur Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform float Opacity;
uniform sampler2D Texture;
uniform vec2 TextureSize;

varying vec2 v_TexCoords[BLUR_SAMPLES];

void main()
{    
    vec4 color = vec4(0);
    for (int i=0; i<BLUR_SAMPLES; i++) {
        color += texture2D(Texture, v_TexCoords[i]);
    }
    color /= float(BLUR_SAMPLES);
    
    color *= Opacity;
        
    gl_FragColor = color;
}
