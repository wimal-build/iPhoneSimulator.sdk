#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_lineWidth;
uniform float u_capWidth;

attribute vec4 a_vertex;
attribute vec2 a_offset;    // AKA normal to road direction
attribute vec2 a_texture;

varying vec2 v_texture;

void main()
{
    v_texture = a_texture;
    
    vec2 offset = a_offset * (a_texture.y == 0.0 ? u_lineWidth : u_capWidth);
    
    vec4 vert = a_vertex;
    vert.xy += offset;
    
    gl_Position = u_matrix * vert;
}
