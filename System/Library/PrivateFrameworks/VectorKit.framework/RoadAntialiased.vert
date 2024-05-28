#ifdef GL_ES
precision highp float;
#endif

uniform mat4    u_matrix;
uniform float   u_lineWidth;

attribute vec4  a_vertex;
attribute vec2  a_offset;    // AKA normal to road direction
attribute vec2  a_texture;

varying vec2    v_texture;

void main()
{
    v_texture   = a_texture;
    
    vec4 vert   = a_vertex;
    vert.xy     += a_offset * u_lineWidth;
    
    gl_Position = u_matrix * vert;
}
