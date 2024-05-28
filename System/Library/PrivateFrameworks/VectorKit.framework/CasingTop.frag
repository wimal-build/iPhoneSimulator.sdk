precision mediump float;

uniform vec4 u_color;
uniform float u_alpha;

varying vec2 v_texture;
varying float v_fade;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

void main()
{
    vec4 topColor = mix(u_color, u_skyBottomColor, v_fade);
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, topColor.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    gl_FragColor.a = u_alpha;
}
