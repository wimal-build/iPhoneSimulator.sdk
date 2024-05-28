precision highp float;

uniform mat4 u_matrix;

attribute vec4 a_vertex;
// We don't need these attributes, but they are part of the vertex, so FYI
/*
attribute vec2 a_offset;    // AKA normal to road direction
attribute vec2 a_texture;
*/

void main()
{
    vec4 centerPoint = u_matrix * a_vertex;
    gl_Position = centerPoint;

}
