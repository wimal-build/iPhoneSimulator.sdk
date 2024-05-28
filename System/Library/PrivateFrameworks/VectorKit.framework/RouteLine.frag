#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
#endif

uniform lowp sampler2D u_alphaTextureSampler;

uniform highp float u_splitLength;

uniform lowp vec4 u_travelledColor;
uniform highp vec4 u_inverseBaseColor;

varying highp vec2 v_maskTexture;
varying highp float v_lengthAlongSection;

uniform lowp float u_alphaScale;

void main() 
{
    // get current framebuffer value
#ifdef GL_ES
    lowp vec4 framebuffer = gl_LastFragData[0];
 
    if (framebuffer.a == 1.0)
    {
        discard;
    }
#endif
    lowp vec4 baseColor = 1.0 - u_inverseBaseColor;
    
    lowp float untravelledOrNot = (u_splitLength < v_lengthAlongSection) ? 1.0 : 0.0;
    baseColor = baseColor * untravelledOrNot + u_travelledColor * (1.0 - untravelledOrNot);

    lowp vec4 mask = texture2D(u_alphaTextureSampler, v_maskTexture);
    baseColor.a *= mask.a;

#ifdef GL_ES
    lowp vec3 color  = baseColor.xyz;
    lowp float alpha = baseColor.a;

    gl_FragColor = vec4(mix(framebuffer.xyz, color, alpha * u_alphaScale), mask.a);
#else
    gl_FragColor = vec4(baseColor.rgb, baseColor.a*u_alphaScale);
#endif
}
