precision highp float;

uniform mat4 u_matrix;
uniform float u_lineWidth;

attribute vec4 a_vertex;
attribute vec2 a_offset;    // AKA normal to road direction
attribute vec2 a_texture;

varying vec2 v_texture;

void main()
{
    v_texture = a_texture;
    
    // workaround a_offset encoding for caps used for fattening (not used here, just dealt with)
    float direction = -(a_texture.x * a_texture.y);

    vec2 offset = a_offset;
    offset = vec2(a_offset.x + (direction * a_offset.y), a_offset.y + (-direction * a_offset.x));

    offset *= u_lineWidth;
    
    vec4 vert = a_vertex;
    vert.xy += offset;
    
    gl_Position = u_matrix * vert;
}
