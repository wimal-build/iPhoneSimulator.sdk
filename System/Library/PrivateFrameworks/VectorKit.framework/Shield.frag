#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;

varying vec2 v_texture;
varying float v_alpha;
varying float v_brightness;
varying float v_saturation;

const vec3 luminanceCoeff = vec3(0.299, 0.587, 0.114);

void main() 
{
    mediump vec4 tex0 = texture2D(u_textureSampler, v_texture);
    float luminance = dot(tex0.rgb, luminanceCoeff);
    tex0.rgb = mix(vec3(luminance), tex0.rgb, v_saturation);
    gl_FragColor = tex0 * v_alpha;
    gl_FragColor.rgb *= v_brightness;
}

