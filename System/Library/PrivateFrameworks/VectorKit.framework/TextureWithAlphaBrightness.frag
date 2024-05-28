#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;
uniform float u_alpha;
uniform float u_brightness;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture) * u_alpha;
    gl_FragColor.rgb *= u_brightness;
}

