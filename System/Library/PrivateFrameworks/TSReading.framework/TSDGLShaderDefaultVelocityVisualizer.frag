// Default Velocity Visualizer Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;

varying vec2 v_TexCoord;

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord);
    /* Remap [-1,1] to [0,1] */
    color.xy = vec2(0.5) + color.xy*0.5;
    
    gl_FragColor = color;
}
