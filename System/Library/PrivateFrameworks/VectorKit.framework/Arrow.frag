#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
#endif

uniform lowp sampler2D u_alphaTextureSampler;
uniform lowp float u_alphaScale;

varying highp vec2  v_texture;
varying lowp  vec4 v_fillColor;
varying lowp  vec4 v_strokeColor;

mediump float saturate(mediump float x)
{
    return clamp(x, 0.0, 1.0);
}

void main() 
{
#ifdef GL_ES
    lowp vec4 framebuffer = gl_LastFragData[0];
#endif
    
    lowp vec4 mask = texture2D(u_alphaTextureSampler, v_texture.xy);
    
    mediump float distance = mask.b;
    mediump float saturatedStrokeDistance = saturate(distance * 48.0);
    mediump float saturatedAADistance     = saturate(distance * 24.0 - 1.0);

    lowp vec3 arrowColor          = mix(v_fillColor, v_strokeColor, saturatedStrokeDistance).xyz;

#ifdef GL_ES
    lowp vec3 shadowedFrameBuffer = framebuffer.xyz * mask.r;
    lowp vec3 maskedColor = vec3(mix(arrowColor, shadowedFrameBuffer, saturatedAADistance));
    gl_FragColor = vec4(mix(framebuffer.xyz, maskedColor, u_alphaScale), max(framebuffer.a, 1.0 - saturatedAADistance));
#else
    gl_FragColor = vec4(arrowColor, (1.0 - saturatedAADistance) * u_alphaScale);
#endif
}
