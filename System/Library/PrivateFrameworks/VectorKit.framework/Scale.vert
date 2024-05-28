
uniform mat4 u_matrix;
uniform float u_scale;

attribute vec4 a_vertex;

void main() 
{
    vec4 scaled_vertex = a_vertex;
    scaled_vertex.z *= u_scale;
	gl_Position = u_matrix * scaled_vertex;
}

