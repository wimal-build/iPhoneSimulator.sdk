precision lowp float;

uniform vec4 u_color;
uniform float u_scale;
uniform vec4 u_oneMinusScale;
uniform sampler2D u_textureSampler;

varying vec2 v_texture;
varying float v_gradient;
varying float v_maxGradient;

void main() 
{
    gl_FragColor = u_color * (u_oneMinusScale + min(v_gradient, v_maxGradient)*texture2D(u_textureSampler, v_texture));
}
