// Default Texture and Opacity Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform float   Opacity;

varying vec2 v_TexCoord;

void main()
{
    gl_FragColor = vec4(Opacity) * texture2D(Texture, v_TexCoord);
}
