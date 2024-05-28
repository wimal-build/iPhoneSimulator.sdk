precision mediump float;

uniform mat4 u_matrix;
uniform float u_halfWidth;
uniform float u_textureCoordinateAdjustmentFactor;
uniform highp float u_routeTextureMappingScaler;
uniform highp float u_trafficWidthScaler;
uniform highp float u_strokeWidthScale;

attribute vec4 a_vertex;
attribute vec2 a_normal;
attribute vec2 a_texture;
attribute vec3 a_routeMisc;
attribute float a_lengthAlongSection;

varying float v_showPattern;
varying vec4  v_texture;
varying vec4 v_maskTexture; // x,y = fill mask texture coordinates, z, w = stroke mask texture coordinates
varying float v_lengthAlongSection;

void main()
{
    highp float halfWidth = u_halfWidth * u_strokeWidthScale;

    v_texture     = vec4(a_texture.x*u_strokeWidthScale-(u_strokeWidthScale-1.0), a_texture.y*u_strokeWidthScale - 0.5*(u_strokeWidthScale-1.0), a_routeMisc.x*u_trafficWidthScaler, a_routeMisc.y);

    v_maskTexture = vec4(0.0, 0.0, 2.0 * a_texture.y - 1.0, a_texture.x < 1.0 ? 1.0 : 0.0);
    v_maskTexture.xy = v_maskTexture.zw * u_strokeWidthScale;

    v_showPattern = a_texture.x>=1.0?1.0:0.0;
    v_lengthAlongSection = a_lengthAlongSection;
    
    vec2 offset = a_normal.xy * halfWidth;
    vec4 vertex = a_vertex;

    // a_routeMisc.x means lef/right -1/+1
    // u_textureCoordinateAdjustmentFactor maps from local to world space
    // a_textureAndArcLength.w means the end or the start which shift in opposite ways
    v_texture.w= u_routeTextureMappingScaler * (a_routeMisc.y>0.0?1.0:-1.0) * ( v_texture.w + halfWidth * u_textureCoordinateAdjustmentFactor * a_routeMisc.z * a_routeMisc.x);
    
    // Cap. Force the point to be the specified distance from the previous or next point (depending on whether cap is at start or end of route line)
    vec2 n = normalize(a_normal.xy);
    if (a_texture.x < 0.0) {
        vertex = a_vertex + halfWidth*vec4(n.y, -n.x, 0.0, 0.0);   // end cap
    } else if (a_texture.x < 0.5) {
        vertex = a_vertex + halfWidth*vec4(-n.y, n.x, 0.0, 0.0); // start cap
    }
    
    gl_Position = u_matrix * (vertex - sign(a_texture.y - 0.5) * vec4(offset, 0.0, 0.0));
}
