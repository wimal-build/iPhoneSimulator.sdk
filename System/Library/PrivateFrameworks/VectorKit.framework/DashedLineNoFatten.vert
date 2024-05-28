#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_lineWidth;
uniform float u_distanceMultiplier;

attribute vec4 a_vertex;
attribute vec2 a_offset;    // AKA normal to road direction
attribute vec2 a_texture;
attribute float a_distance;

varying vec2 v_texture;
varying float v_distance;

void main()
{
    v_texture = a_texture;
    v_distance = a_distance * u_distanceMultiplier;
    
    // workaround a_offset encoding for caps used for fattening (not used here, just dealt with)
    float direction = -(a_texture.x * a_texture.y);

    vec2 offset = a_offset;
    offset = vec2(a_offset.x + (direction * a_offset.y), a_offset.y + (-direction * a_offset.x));

    offset *= u_lineWidth;
    
    vec4 vert = a_vertex;
    vert.xy += offset;
    
    gl_Position = u_matrix * vert;
}
