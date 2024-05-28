// Default Velocity Mesh Vertex Shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;

attribute vec3  Position;
attribute vec3  PreviousPosition;

varying vec4 v_PrevPos;
varying vec4 v_ThisPos;

void main()
{
    gl_Position = MVPMatrix * vec4(Position, 1);
    v_ThisPos = gl_Position;
    v_PrevPos = MVPMatrix * vec4(PreviousPosition, 1);
}
