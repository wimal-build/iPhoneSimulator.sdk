
precision mediump float;
uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;
uniform float u_alpha;

void main() 
{
    gl_FragColor = vec4(0.0,0.0,0.0,(v_texture.s*v_texture.s*0.18)*u_alpha);
}

