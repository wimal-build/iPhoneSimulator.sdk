#version 100

attribute vec4 position;
attribute vec2 texCoord;

uniform mat4 uTransform;

varying vec2 vTexCoord;

void main()
{
    vTexCoord = texCoord;
    gl_Position = uTransform * position;
}