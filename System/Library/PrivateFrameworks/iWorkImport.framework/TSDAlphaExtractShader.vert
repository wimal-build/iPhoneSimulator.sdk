attribute vec2 Position;
attribute vec2 TexCoord;

uniform mat4 MVPMatrix;

void main()
{
    gl_Position = MVPMatrix * vec4(Position, 0.0, 1.0);
}