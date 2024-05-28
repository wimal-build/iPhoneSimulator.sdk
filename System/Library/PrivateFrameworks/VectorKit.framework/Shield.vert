
uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute float a_alpha;
attribute float a_brightness;

varying vec2 v_texture;
varying float v_alpha;
varying float v_brightness;

void main() 
{
    v_texture = a_texture;
    v_alpha = a_alpha;
    v_brightness = a_brightness;
    gl_Position = u_matrix * a_vertex;
}


