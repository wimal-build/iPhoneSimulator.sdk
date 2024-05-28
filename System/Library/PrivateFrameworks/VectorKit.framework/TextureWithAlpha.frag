
precision mediump float;
uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;
uniform float u_alpha;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture) * u_alpha;
}

