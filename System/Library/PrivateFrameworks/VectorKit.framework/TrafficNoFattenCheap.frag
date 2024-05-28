#extension GL_EXT_shader_framebuffer_fetch : require

uniform lowp sampler2D u_textureSampler;
uniform lowp vec4 u_primaryColor;
uniform lowp vec4 u_secondaryColor;
uniform lowp float u_alphaScaler;
uniform lowp vec2 u_alphaRamp;
uniform lowp float u_glowScale;
uniform mediump vec4 u_trafficPattern;

varying highp vec2 v_texture;

void main()
{
    // get current framebuffer value
    lowp vec4 framebuffer = gl_LastFragData[0];

    mediump vec4 mask = texture2D(u_textureSampler, v_texture);
    
    mask.r = clamp( mask.r * u_alphaRamp.x + u_alphaRamp.y, 0.0, 1.0);
    
    // red channel: blend from secondary color (white) to primary color
    lowp vec3 color = mix(vec3(1.0), u_primaryColor.rgb,  mask.r);
    
    color = mix(framebuffer.rgb, color.rgb, max(0.0, min(1.0 - framebuffer.a * u_alphaScaler, max(mask.r, mask.g * u_glowScale))));
    
    gl_FragColor = vec4(color, framebuffer.a);
}