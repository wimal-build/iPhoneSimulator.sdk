#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_landSampler;
uniform lowp sampler2D u_vegetationSampler;
uniform lowp float u_vegetationAlpha;
uniform lowp float u_vegetationBrightness;

uniform lowp sampler2D u_landVariantSampler;
uniform float u_textureVariation;

varying vec2 v_texture;

void main() 
{
    vec4 land = texture2D(u_landSampler, v_texture);
    vec4 landVariant = texture2D(u_landVariantSampler, v_texture);
    vec3 landRGB = (1.0 - u_textureVariation) * land.rgb + u_textureVariation * landVariant.rgb;

    vec4 vegetation = texture2D(u_vegetationSampler, v_texture);
    vegetation.rgb *= u_vegetationBrightness;
    vegetation *= u_vegetationAlpha;
    gl_FragColor = vec4(vegetation.rgb + ((1.0-vegetation.a) * landRGB), 1.0);
}

