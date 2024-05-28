#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
#extension GL_OES_standard_derivatives : enable
#endif

uniform lowp vec4 u_primaryColor;
uniform lowp vec4 u_secondaryColor;
uniform lowp float u_alphaScaler;
uniform lowp vec2 u_alphaRamp;
uniform lowp float u_glowScale;
uniform mediump vec4 u_trafficPattern;
const highp float u_phaseOffset = 0.0;

varying highp vec3 v_texture;
varying highp vec4 v_clamp;

void main()
{
    highp float closestSegmentOffset = clamp(v_texture.y, v_clamp.x, v_clamp.y);

    mediump float closestLocalY = clamp(fract(closestSegmentOffset),
                                        0.5 - u_trafficPattern.y / u_trafficPattern.x,
                                        0.5 + u_trafficPattern.y / u_trafficPattern.x);

    mediump float y_diff        = fract(v_texture.y) - closestLocalY;
    mediump float distSquared   = (v_texture.x * v_texture.x + y_diff * y_diff);
    highp vec2 zoomfactor       = u_alphaRamp.xy / fwidth(v_texture).x;
    mediump vec2 mask           = clamp((u_trafficPattern.zw - distSquared) * zoomfactor, 0.0, 1.0);

#ifdef GL_ES
    // get current framebuffer value
    lowp vec4 framebuffer       = gl_LastFragData[0];
    lowp float maxAlpha         = 1.0 - framebuffer.a * u_alphaScaler;
    lowp vec3 color1            = mix(framebuffer.rgb, u_secondaryColor.rgb, maxAlpha * mask.g * u_glowScale);
    lowp vec3 color2            = mix(color1, u_primaryColor.rgb,  min(maxAlpha, mask.r));

    // color2 = mix(color2, vec3(fract(distSquared*20.0), fract(v_texture.y*15.0), 0.0), mask.r);
    gl_FragColor = vec4(color2, max(mask.r, framebuffer.a));
#else // GL_ES
    // On the Desktop, alphaScaler will always be 1
    // On the Desktop, we cannot clamp the shader on the roads by using framebuffer.a,
    // let's consider we're always on the road for now (i.e.: framebuffer.a = 0)
    // which will fix maxAlpha to 1.0
    // Now compute the alpha and unblended values for the final color, so we can use the normal blend mode
    lowp float alpha1 = mask.g * u_glowScale; // Actually: maxAlpha * mask.g * u_glowScale;
    lowp float alpha2 = mask.r; // Actually: min(maxAlpha, mask.r);
    lowp float alpha = alpha1 + alpha2 - (alpha1 * alpha2);
    // Don't divide by zero, some GPUs won't properly blend the result, even with alpha = 0, <rdar://problem/13696449>
    if (alpha == 0.0) {
        gl_FragColor = vec4(0);
    } else {
        lowp vec3 color = (u_primaryColor.rgb * alpha2 + u_secondaryColor.rgb * alpha1 * (1.0 - alpha2)) / alpha;
        gl_FragColor = vec4(color, alpha);
    }
#endif
}
