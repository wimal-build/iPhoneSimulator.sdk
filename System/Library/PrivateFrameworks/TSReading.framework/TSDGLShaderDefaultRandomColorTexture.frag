// Default Random Color Texture Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform vec4 Color;

varying vec2 v_TexCoord;

void main()
{
    gl_FragColor = mix(Color, texture2D(Texture, v_TexCoord), 0.5);
}
