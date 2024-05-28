#ifdef GL_ES
precision lowp float;
#endif

uniform highp float u_skyStartOffset;
uniform vec4 u_horizon;
uniform vec4 u_color;
uniform float u_screenHeight;

void main()
{
    gl_FragColor = mix(u_horizon, u_color, (gl_FragCoord.y/u_screenHeight-u_skyStartOffset)*10.0);
}
