#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require
#endif

uniform lowp int u_channel;
uniform lowp sampler2D u_textureSampler;

varying highp vec2 v_texture;
varying lowp vec4 v_color;
varying lowp vec4 v_haloColor;
varying lowp float v_alpha;

// Texture is 2 channel: ( mask.r == text, mask.a == halo)

void main()
{
#ifdef GL_ES
    lowp vec4 framebuffer = gl_LastFragData[0];
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    
    if (u_channel==0)  { // Halo
        // Inner halo
        lowp float innerHaloMask = clamp(2.0 * (mask.a - 0.5), 0.0, 1.0);
        
        // Where there is a route, use a slightly larger halo
        lowp float outerHaloScale = 3.0;
        lowp float outerHaloMask = clamp(2.0 * (mask.a - 0.45) * outerHaloScale, 0.0, 1.0);
        lowp float halomask = max(innerHaloMask, outerHaloMask * framebuffer.a);
        
        lowp float alpha = halomask * v_alpha * v_haloColor.a;
        
        lowp vec3 color = mix(framebuffer.rgb, v_haloColor.rgb, alpha);
        gl_FragColor = vec4(color, min(1.0 - alpha, framebuffer.a));
    }
    
    else { // Text
        lowp vec3 color = mix(framebuffer.rgb, v_color.rgb, mask.r * v_color.a);
        gl_FragColor = vec4(color, framebuffer.a);
    }
#else
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    if (u_channel==1) {
        gl_FragColor = vec4(v_color.rgb, mask.r * v_color.a);
    } else {
        lowp float halomask = clamp(2.0 * (mask.a - 0.5), 0.0, 1.0);
        gl_FragColor = vec4(v_haloColor.rgb, halomask * v_alpha);
    }
#endif
}
