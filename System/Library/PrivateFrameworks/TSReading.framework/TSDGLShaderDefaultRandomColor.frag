// Default Random Color Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 Color;

void main()
{
    gl_FragColor = Color;
}
