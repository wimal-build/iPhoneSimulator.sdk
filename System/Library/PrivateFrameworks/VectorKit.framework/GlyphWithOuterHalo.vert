
uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute vec4 a_color;
attribute vec4 a_haloColor;
attribute float a_alpha;

varying vec2 v_texture;
varying vec4 v_color;
varying vec4 v_haloColor;
varying float v_alpha;

void main()
{
	gl_Position = u_matrix * a_vertex;
    v_texture = a_texture;
    v_alpha = a_alpha;
    v_color = vec4(a_color.rgb, a_color.a * a_alpha);
    v_haloColor = a_haloColor;
}


