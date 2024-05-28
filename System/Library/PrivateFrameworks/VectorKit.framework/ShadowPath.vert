
uniform mat4 u_matrix;
uniform highp vec3 u_direction;   // light direction
uniform float u_width;      // width of shadow

attribute vec4 a_vertex;    // shadow path
attribute vec2 a_offset;    // Used to fade out the shadow at the direction of the path converges with the light direction.
attribute float a_texture;  // Alpha ramp anchor
 
varying float v_alphaRamp;      // alpha ramp
varying float v_alphaAdjust;    // alpha adjustment based on a_offset

void main() 
{
    vec3 shift = u_direction * u_width * a_texture;
    vec4 shifted = vec4(a_vertex.x + shift.x, a_vertex.y + shift.y, shift.z, 1.0);
    
    float d = 1.0 - abs(dot(vec3(a_offset, 0.0), u_direction));
    v_alphaAdjust = min(pow(d, 1.5), 1.0);
    v_alphaRamp = a_texture;
    gl_Position = u_matrix * shifted;
}
