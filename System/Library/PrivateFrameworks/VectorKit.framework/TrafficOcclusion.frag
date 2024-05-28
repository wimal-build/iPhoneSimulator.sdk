#extension GL_EXT_shader_framebuffer_fetch : require

uniform mediump float u_alphaSlope;
uniform mediump float u_halfAlphaSlope;

varying mediump float v_u;

void main() 
{
    gl_FragColor = gl_LastFragData[0];
    gl_FragColor.a = max(min(u_halfAlphaSlope-abs(u_alphaSlope*v_u-u_halfAlphaSlope), 1.0), gl_FragColor.a);
}
