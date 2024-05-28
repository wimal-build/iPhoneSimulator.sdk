#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
#endif

uniform mediump float u_alphaSlope;
uniform mediump float u_halfAlphaSlope;

varying mediump float v_u;

void main() 
{
#ifdef GL_ES
    gl_FragColor = gl_LastFragData[0];
    gl_FragColor.a = max( u_halfAlphaSlope + u_alphaSlope * abs(v_u - 0.5), gl_FragColor.a);
#else
    discard;
#endif
    
}
