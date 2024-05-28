#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
uniform float u_alpha;
uniform mediump float u_brightness;

varying vec2 v_texture;

void main() 
{
    gl_FragColor = vec4(0.0,0.0,0.0,(v_texture.s*v_texture.s*0.18)*u_alpha);
    gl_FragColor.rgb *= u_brightness;
}

