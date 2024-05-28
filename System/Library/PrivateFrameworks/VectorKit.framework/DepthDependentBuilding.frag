#ifdef GL_ES
precision lowp float;
#endif

uniform vec4 u_color;
uniform float u_scale;
uniform vec4 u_oneMinusScale;
uniform float u_brightness;
uniform sampler2D u_textureSampler;

varying vec2 v_texture;
varying float v_gradient;
varying float v_maxGradient;
varying highp float v_depthCoordinate;

void main() 
{
    gl_FragColor = u_color * (u_oneMinusScale + min(v_gradient, v_maxGradient)*u_brightness*texture2D(u_textureSampler, v_texture)) + smoothstep(0.0, 1.0, clamp(v_depthCoordinate, 0.0, 1.0))*0.1;
}
