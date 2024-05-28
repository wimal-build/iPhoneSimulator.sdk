
uniform mat4 u_matrix;
uniform float u_alpha;
uniform float u_fade;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_texture;
varying float v_alpha;
varying vec4 v_color;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main() 
{
    gl_Position = u_matrix * a_vertex;

    v_texture = a_texture;

    v_color = vec4(0.0,0.0,0.0,1.0);

    vec4 pos = u_modelViewMatrix * a_vertex;
    float fade = clamp(-pos.z * u_fade, 0.0, 1.0);
    fade = ( 0.5 * cos(3.14 * fade) ) + 0.5;
    v_alpha = clamp(fade, 0.0, u_alpha);

    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
