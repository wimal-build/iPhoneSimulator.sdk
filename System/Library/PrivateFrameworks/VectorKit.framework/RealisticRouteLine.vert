// Shader for realistic-mode route line
// Computes normals in route space and ensures constant thickness in meters is constant

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_halfWidth;

attribute vec4 a_vertex;
attribute vec2 a_normal;
attribute vec2 a_texture;
attribute vec3 a_routeMisc;
attribute float a_lengthAlongSection;

varying vec2 v_texture;
varying float v_lengthAlongSection;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

void main()
{
    v_texture = a_texture;
    v_lengthAlongSection = a_lengthAlongSection;

    vec2 offset = a_normal.xy*u_halfWidth;
    vec4 vertex = a_vertex;
    
    // Cap. Force the point to be the specified distance from the previous or next point (depending on whether cap is at start or end of route line)
    vec2 n = normalize(a_normal.xy);
    if (a_texture.x < 0.0) {
        vertex = a_vertex + u_halfWidth*vec4(n.y, -n.x, 0.0, 0.0);   // end cap
    } else if (a_texture.x < 0.5) {
        vertex = a_vertex + u_halfWidth*vec4(-n.y, n.x, 0.0, 0.0); // start cap
    }
    
    gl_Position = u_matrix * (vertex - sign(a_texture.y-0.5) * vec4(offset, 0.0, 0.0));
    
    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
