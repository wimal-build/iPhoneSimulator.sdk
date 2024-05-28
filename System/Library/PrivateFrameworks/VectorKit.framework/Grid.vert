
uniform highp mat4 u_matrix;
uniform highp mat4 u_gridView;

uniform vec4 u_color;
uniform vec4 u_lineColor;

uniform float u_majorSize;
uniform float u_minorSize;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying highp vec4 v_majorMinorVertex;

void main() 
{
    // compute projected position
    gl_Position = u_matrix * a_vertex;

    // compute grid position
    vec4 grid = u_gridView * a_vertex;

    // pack grid data into varying vertex attribute
    v_majorMinorVertex.xy = grid.xy*u_majorSize;
    v_majorMinorVertex.zw = grid.xy*u_minorSize;
}
