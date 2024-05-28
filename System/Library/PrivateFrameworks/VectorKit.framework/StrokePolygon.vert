#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_lineWidth;
uniform float u_scale;

attribute vec4 a_vertex;
attribute vec2 a_offset;    // AKA normal to polygon stroke direction
attribute vec2 a_texture;

varying vec2 v_stroketexture;
varying vec2 v_polygontexture;

void main()
{
    v_stroketexture = a_texture;
    vec2 offset = a_offset * u_lineWidth;
    
    vec4 vert = a_vertex;
    vert.xy += offset;
    v_polygontexture = vert.xy * u_scale;

    gl_Position = u_matrix * vert;
}
