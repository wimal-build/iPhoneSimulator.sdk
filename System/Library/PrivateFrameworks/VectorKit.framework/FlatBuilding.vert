#ifdef GL_ES
precision highp float;
#endif

attribute vec4 a_vertex;

uniform mat4 u_matrix;
uniform float u_maxLayeringHeight;
uniform float u_layeringHeightScale;

void main() 
{
    vec4 scaled_vertex  = a_vertex;
    scaled_vertex.z     = 0.0;
    gl_Position         = u_matrix * scaled_vertex;
    gl_Position.z       = (u_layeringHeightScale * (u_maxLayeringHeight - a_vertex.z) - 0.9) * gl_Position.w;
}
