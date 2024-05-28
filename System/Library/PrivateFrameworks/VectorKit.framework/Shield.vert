
uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute float a_alpha;

varying vec2 v_texture;
varying float v_alpha;

void main() 
{
	gl_Position = u_matrix * a_vertex;
    v_texture = a_texture;
    v_alpha = a_alpha;
}

