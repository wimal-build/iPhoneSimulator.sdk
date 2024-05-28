
uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute float a_alpha;
attribute float a_brightness;
attribute float a_saturation;

varying vec2 v_texture;
varying float v_alpha;
varying float v_brightness;
varying float v_saturation;

void main() 
{
    v_texture = a_texture;
    v_alpha = a_alpha;
    v_brightness = a_brightness;
    v_saturation = a_saturation;
    gl_Position = u_matrix * a_vertex;
}


