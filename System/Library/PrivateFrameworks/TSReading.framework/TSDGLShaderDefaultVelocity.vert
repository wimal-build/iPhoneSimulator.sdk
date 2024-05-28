// Default Velocity Vertex Shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;
uniform mat4    PreviousMVPMatrix;

attribute vec2  Position;

varying vec4 v_PrevPos;
varying vec4 v_ThisPos;

void main()
{
    gl_Position = MVPMatrix * vec4(Position, 0, 1);
    v_ThisPos = gl_Position;
    v_PrevPos = PreviousMVPMatrix * vec4(Position, 0, 1);
}
