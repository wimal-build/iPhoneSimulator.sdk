#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_vegetationSampler;
uniform lowp float u_vegetationAlpha;
uniform lowp float u_vegetationBrightness;
uniform lowp vec4 u_groundColor;

varying vec2 v_texture;

void main() 
{
    vec4 vegetation = texture2D(u_vegetationSampler, v_texture);
    vegetation.rgb *= u_vegetationBrightness;
    vegetation *= u_vegetationAlpha;
    gl_FragColor = vec4(vegetation.rgb + ((1.0-vegetation.a) * u_groundColor.rgb), 1.0);
}

