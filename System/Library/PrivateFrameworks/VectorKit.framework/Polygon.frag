#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;

uniform float u_alpha;

varying vec2 v_texture;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
    gl_FragColor.a = u_alpha;
}
