#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
uniform lowp vec4 u_color;
varying vec2 v_texture;

void main() 
{
    gl_FragColor = u_color;
    gl_FragColor *= texture2D(u_textureSampler, v_texture).a;
}

