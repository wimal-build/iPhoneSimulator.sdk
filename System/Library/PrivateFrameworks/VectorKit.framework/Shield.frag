#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;

varying vec2 v_texture;
varying float v_alpha;
varying float v_brightness;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
    gl_FragColor *= v_alpha;
    gl_FragColor.rgb *= v_brightness;
}

