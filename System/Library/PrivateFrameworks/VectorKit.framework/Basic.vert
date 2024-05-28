
uniform mat4 u_matrix;
attribute vec4 a_vertex;

void main() 
{
    vec4 v = a_vertex;
    v.w = 1.0;
	gl_Position = u_matrix * v;
    gl_PointSize = 6.0;
}
