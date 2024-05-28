
uniform mat4 u_matrix;
uniform float u_fade;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_texture;
varying float v_fade;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main() 
{
    gl_Position = u_matrix * a_vertex;

    vec4 pos = u_modelViewMatrix * a_vertex;
    float t = clamp(-pos.z*u_fade,0.0,1.0);
    v_fade = clamp((0.5*cos(3.14*t)+0.5), 0.0, 1.0);

    v_texture = a_texture;

    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
