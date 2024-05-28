precision lowp float;

uniform sampler2D u_textureSampler;
uniform sampler2D u_secondTextureSampler;
uniform float u_alphaScale;

varying mediump vec2 v_texture;
varying mediump vec2 v_secondTexture;

void main() 
{
    vec4 c0 = texture2D(u_textureSampler, v_texture);
    vec4 c1 = texture2D(u_secondTextureSampler, v_secondTexture);
    gl_FragColor = (1.0-c1.a)*c0+c1.a*c1;
    gl_FragColor.a = max(c0.a, c1.a)*u_alphaScale;
}
