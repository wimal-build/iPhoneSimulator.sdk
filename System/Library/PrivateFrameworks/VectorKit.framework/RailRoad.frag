#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
#endif

uniform lowp vec4 u_color;
uniform lowp vec4 u_secondaryColor;
uniform lowp sampler2D u_textureSampler;
varying highp vec2 v_texture;
varying highp float v_distance;

void main()
{
    lowp float aa = (1.0 - abs(v_texture.x)) / fwidth(v_texture).x;

    // Since railway is so thin, AA in tangent direciton doesn't make a difference
    lowp float procedureValue = fract(v_distance)>0.5?1.0:0.0;

    gl_FragColor = vec4(mix(u_color.rgb, u_secondaryColor.rgb, procedureValue), aa);
}
