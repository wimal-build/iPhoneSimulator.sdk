#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
uniform lowp sampler2D u_textureVariantSampler;
uniform float u_textureVariation;

varying vec2 v_texture;

void main() 
{
    vec4 color1 = texture2D(u_textureSampler, v_texture);
    vec4 color2 = texture2D(u_textureVariantSampler, v_texture);
    gl_FragColor = (1.0 - u_textureVariation) * color1 + u_textureVariation * color2;
}

