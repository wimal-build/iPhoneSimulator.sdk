#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
}

