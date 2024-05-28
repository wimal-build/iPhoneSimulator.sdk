
uniform mat4 u_matrix;
uniform vec3 u_cameraDirection;
uniform float u_alpha;
uniform float u_fade;
uniform float u_width;

attribute vec4 a_vertex;
attribute vec2 a_texture;
attribute vec3 a_normal;
attribute float a_distance;

varying vec2 v_texture;
varying float v_alpha;
varying float v_distance;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main() 
{
    gl_Position = u_matrix * vec4(a_vertex.xyz + a_normal * u_width * max(0.0, -dot(a_normal, u_cameraDirection)), 1.0);
    v_texture = a_texture;
    v_distance = a_distance;
    
    vec4 pos = u_modelViewMatrix * a_vertex;
    float t = clamp(-pos.z*u_fade,0.0,1.0);
    v_alpha = clamp((0.5*cos(3.14*t)+0.5), 0.0, u_alpha);

    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
