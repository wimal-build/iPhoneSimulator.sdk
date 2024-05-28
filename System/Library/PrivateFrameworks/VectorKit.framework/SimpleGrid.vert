
precision mediump float;

uniform mat4 u_matrix;
uniform mat4 u_gridView;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_vertex;

void main() 
{
    // compute projected position
    gl_Position = u_matrix * a_vertex;

    // compute grid position
    vec4 grid = u_gridView * a_vertex;

    // pack grid data into varying vertex attribute
    v_vertex = grid.xy;
}
