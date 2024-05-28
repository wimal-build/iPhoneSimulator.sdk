
uniform lowp vec4 u_color;
uniform lowp sampler2D u_textureSampler;
varying highp vec2 v_texture;

void main() 
{
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    gl_FragColor = vec4(u_color.rgb, u_color.a * mask.a);
}
