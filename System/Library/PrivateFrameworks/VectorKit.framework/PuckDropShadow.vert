uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute float a_alpha;

varying float v_alpha;

void main() 
{
	gl_Position = u_matrix * a_vertex;
    v_alpha = a_alpha;
}
