#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_landSampler;
uniform lowp sampler2D u_vegetationSampler;
uniform lowp float u_vegetationAlpha;
uniform lowp float u_vegetationBrightness;

varying vec2 v_texture;

void main() 
{
    vec4 land = texture2D(u_landSampler, v_texture);
    vec4 vegetation = texture2D(u_vegetationSampler, v_texture);
    vegetation.rgb *= u_vegetationBrightness;
    vegetation *= u_vegetationAlpha;
    gl_FragColor = vec4(vegetation.rgb + ((1.0-vegetation.a) * land.rgb), 1.0);
}

