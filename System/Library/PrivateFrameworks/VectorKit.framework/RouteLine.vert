#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_halfWidth;
uniform highp float u_strokeWidthScale;

attribute vec4 a_vertex;
attribute vec2 a_normal;
attribute vec2 a_texture;
attribute float a_lengthAlongSection;

varying vec2 v_maskTexture;
varying float v_lengthAlongSection;

void main()
{
    highp float halfWidth = u_halfWidth * u_strokeWidthScale;
    v_maskTexture.xy = vec2(2.0 * a_texture.y - 1.0, a_texture.x < 1.0 ? 1.0 : 0.0);

    v_lengthAlongSection = a_lengthAlongSection;
    
    vec2 offset = a_normal.xy * halfWidth;
    vec4 vertex = a_vertex;

    // Cap. Force the point to be the specified distance from the previous or next point (depending on whether cap is at start or end of route line)
    vec2 normal = normalize(a_normal.xy);
    if (a_texture.x < 0.0) {
        vertex = a_vertex + halfWidth*vec4(normal.y, -normal.x, 0.0, 0.0);   // end cap
    } else if (a_texture.x < 0.5) {
        vertex = a_vertex + halfWidth*vec4(-normal.y, normal.x, 0.0, 0.0); // start cap
    }
    
    gl_Position = u_matrix * (vertex - sign(a_texture.y - 0.5) * vec4(offset, 0.0, 0.0));
}
