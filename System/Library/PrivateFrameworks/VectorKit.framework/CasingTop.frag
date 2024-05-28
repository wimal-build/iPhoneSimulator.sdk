#ifdef GL_ES
precision mediump float;
#endif

uniform float u_alpha;
uniform vec4 u_color;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

void main()
{
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, u_color.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    gl_FragColor.a = u_alpha;
}
