precision mediump float;

uniform highp vec4 u_color;
uniform highp float u_scale;

uniform lowp sampler2D u_textureSampler;
varying vec3 v_normal;

// Fog support
// This debug rendering still inherits from fog program for both simplicity and possible later use
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;

void main()
{
    gl_FragColor.rgb = 0.5 * v_normal + 0.5;
}
