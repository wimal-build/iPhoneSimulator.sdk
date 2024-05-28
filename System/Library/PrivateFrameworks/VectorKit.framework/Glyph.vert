
uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute vec4 a_color;
attribute vec4 a_haloColor;
attribute float a_alpha;

varying vec2 v_texture;
varying vec4 v_color;
varying vec4 v_haloColor;

void main()
{
	gl_Position = u_matrix * a_vertex;
    v_texture = a_texture;
    v_color = a_color * a_alpha;
    v_haloColor = a_haloColor * a_alpha;
}


