#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
uniform lowp sampler2D u_clutSampler;
uniform lowp float u_variation;
varying vec2 v_texture;

void main()
{
    vec4 color = texture2D(u_textureSampler, v_texture);

    const float size = 16.0;
    const float sizeDenom = 1.0 / size;
    const float sizeArray = size - 1.0;
    const float scale = sizeArray / size;
    const float offset = 1.0 / (size * 2.0);
    const float sizeAD = sizeDenom * sizeArray;
    
    vec2 t = (color.rg * scale + offset);
    t.r *= sizeDenom;

    float fb = floor(color.b);
    vec2 tB = vec2(fb, fb + 1.0); // floor + 1.0 instead of ceil
    tB *= sizeAD;

    vec2 tR = t.xx + tB; // first component in uv1, uv2
    vec4 uv = vec4(tR.x, t.y, tR.y, t.y);

    lowp vec4 color1 = texture2D(u_clutSampler, uv.xy);
    lowp vec4 color2 = texture2D(u_clutSampler, uv.zw);

    vec4 clutColor = mix(color1, color2, ( (color.b * sizeAD) - tB.x) );
    gl_FragColor = mix(color, clutColor, u_variation);
}