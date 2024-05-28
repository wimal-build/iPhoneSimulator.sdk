uniform mat4 u_matrix;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_texture;

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

    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
