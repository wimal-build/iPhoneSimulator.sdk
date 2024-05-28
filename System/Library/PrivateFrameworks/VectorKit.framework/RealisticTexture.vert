uniform mat4 u_matrix; // mvp
uniform float u_scale;
uniform float u_alpha;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_texture;
varying float v_alpha;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main() 
{
	gl_Position = u_matrix * a_vertex;
    v_texture = vec2(a_vertex.x * u_scale, a_vertex.y * u_scale);
    v_alpha = u_alpha;
    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
