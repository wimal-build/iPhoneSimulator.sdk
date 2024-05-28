// Default Vertex Shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;

attribute vec2  Position;

void main()
{
      gl_Position = MVPMatrix * vec4(Position, 0, 1);
}
