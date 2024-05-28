#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_halfWidth;
uniform float u_currentManeuverLocation;
uniform lowp vec4 u_fillColor;
uniform lowp vec4 u_strokeColor;
uniform lowp vec4 u_highlightedFillColor;
uniform lowp vec4 u_highlightedStrokeColor;

attribute vec4 a_vertex;
attribute vec2 a_normal;
attribute vec2 a_texture;
attribute vec2 a_offset;

varying vec2 v_texture;
varying vec4 v_fillColor;
varying vec4 v_strokeColor;

void main()
{
    highp float halfWidth = u_halfWidth;
    
    vec2 normalOffset  = a_normal.xy * (halfWidth * a_texture.x);
    float tangetOffsetDistance = halfWidth * a_offset.x;

    vec2 tangentOffset = vec2(a_normal.y, -a_normal.x) * tangetOffsetDistance;
    vec4 vertex = vec4(a_vertex.xy + normalOffset + tangentOffset, a_vertex.zw);
    gl_Position = u_matrix * vertex;
    
    v_texture     = a_texture;
    
    float highlightWeight = clamp(abs(a_offset.y - u_currentManeuverLocation), 0.0, 1.0);

    v_fillColor   = mix(u_highlightedFillColor,   u_fillColor,   highlightWeight);
    v_strokeColor = mix(u_highlightedStrokeColor, u_strokeColor, highlightWeight);
}
