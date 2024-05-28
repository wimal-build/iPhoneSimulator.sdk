
precision mediump float;

uniform lowp sampler2D u_textureSampler;

varying vec2 v_texture;
varying float v_alpha;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
    gl_FragColor *= v_alpha;
}

