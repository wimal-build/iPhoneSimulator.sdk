#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require

precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;
uniform float u_alpha;

void main()
{
    vec4 last = gl_LastFragData[0];
    vec4 color = texture2D(u_textureSampler, v_texture);
    
    gl_FragColor = vec4(mix(color.rgb, last.rgb, last.a * u_alpha), 1.0);
}