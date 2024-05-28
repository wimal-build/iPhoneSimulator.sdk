precision mediump float;

uniform mat4 u_matrix;
uniform float u_halfWidth;

attribute vec4 a_vertex;
attribute vec2 a_normal;
attribute vec2 a_texture;
attribute vec3 a_routeMisc;

varying float v_u;

void main()
{
    v_u = a_texture.y;
    gl_Position = u_matrix * (a_vertex - sign(a_texture.y - 0.5)*vec4(a_normal * u_halfWidth, 0.0, 0.0));
}
