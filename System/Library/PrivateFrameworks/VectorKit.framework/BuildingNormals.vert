
precision highp float;

uniform mat4 u_matrix;
uniform vec4 u_color;
uniform float u_scale;
uniform vec3 u_cameraPositionInTileSpace;

attribute vec4 a_vertex;    // position

attribute vec3 a_normal;
varying vec3 v_normal;

attribute vec2 a_texture;

// Fog support
// This debug rendering still inherits from fog program for both simplicity and possible later use
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main() 
{
    vec4 scaled_vertex  = a_vertex;
    scaled_vertex.z     = scaled_vertex.z * u_scale;
    gl_Position         = u_matrix * scaled_vertex;
    v_normal            = a_normal;
}
