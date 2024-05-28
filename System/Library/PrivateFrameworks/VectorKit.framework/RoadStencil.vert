
uniform mat4 u_matrix;
attribute vec4 a_vertex;

void main() 
{
    vec4 v = a_vertex;
    v.z = 0.0;
    v.w = 1.0;
	gl_Position = u_matrix * v;
}
