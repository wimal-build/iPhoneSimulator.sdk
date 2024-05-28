
uniform lowp int u_channel;
uniform lowp sampler2D u_textureSampler;

varying highp vec2 v_texture;
varying lowp vec4 v_color;
varying lowp vec4 v_haloColor;

// Texture is 2 channel: ( mask.r == text, mask.a == halo )

void main()
{
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    if (u_channel==1) {
        gl_FragColor = vec4(v_color.rgb, mask.r * v_color.a);
    } else {
        lowp float halomask = clamp(2.0 * (mask.a - 0.5), 0.0, 1.0);
        gl_FragColor = vec4(v_haloColor.rgb, halomask * v_haloColor.a);
    }
}

