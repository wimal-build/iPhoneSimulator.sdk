#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
precision lowp float;
#endif

uniform highp vec3 u_direction;
uniform highp vec4 u_color;

varying highp float v_alphaRamp;
varying highp float v_alphaAdjust;

void main()
{
#ifdef GL_ES
    lowp vec4 land = gl_LastFragData[0];    // Grab the land color from the framebuffer since we don't know which texture was used here.
#else
    lowp vec4 land = vec4(u_color.rgb, 1.0); // OSXPORT: we use the landAlpha to compensate blending issues.
#endif
    lowp float landAlpha = mix(1.0, 0.0, min(v_alphaRamp + 1.0, 1.0));  // lerp from 1 -> 0 on the inside half of the path
    land = vec4(land.rgb * landAlpha, landAlpha);
    
    lowp float mask_alpha = mix(1.0, 0.0, v_alphaRamp);
    lowp float alpha = (u_color.a * mask_alpha);
    alpha = min(alpha + landAlpha, 1.0) * v_alphaAdjust;
    lowp vec3 shadowColor = vec3(u_color.rgb * alpha);

#ifndef GL_ES
    alpha = min(alpha, 1.0 - landAlpha);
#endif
    gl_FragColor = vec4(land.rgb + ((1.0-landAlpha) * shadowColor), alpha);
}
