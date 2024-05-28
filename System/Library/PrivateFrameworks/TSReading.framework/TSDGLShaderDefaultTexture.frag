// Default Texture Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;

varying vec2 v_TexCoord;

void main()
{
    gl_FragColor = texture2D(Texture, v_TexCoord);
}
