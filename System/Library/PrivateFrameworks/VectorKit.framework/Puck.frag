precision lowp float;

uniform sampler2D u_textureSampler;
uniform float u_alphaScale;
varying mediump vec2 v_texture;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
    gl_FragColor.a *= u_alphaScale;
}

