
uniform lowp int u_channel;
uniform lowp sampler2D u_textureSampler;

varying highp vec2 v_texture;
varying lowp vec4 v_color;
varying lowp vec4 v_haloColor;

// Texture is 2 channel: ( mask.r == text, mask.a == halo )

void main()
{
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    gl_FragColor = ((u_channel==1)
                       ? mask.r * v_color
                       : mask.a * v_haloColor);
}

