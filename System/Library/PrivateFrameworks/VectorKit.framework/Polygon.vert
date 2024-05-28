
uniform mat4 u_matrix;
uniform float u_scale;

attribute vec4 a_vertex;

varying vec2 v_texture;

void main() 
{
	gl_Position = u_matrix * a_vertex;
    v_texture = vec2(a_vertex.x * u_scale, a_vertex.y * u_scale);
}
