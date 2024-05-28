#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
varying vec2 v_texture;
uniform float u_alpha;
uniform lowp vec4 u_rColor;
uniform lowp vec4 u_gColor;
uniform lowp vec4 u_bColor;

void main() 
{
    lowp vec4 mask = texture2D(u_textureSampler, v_texture);
    
    gl_FragColor.r = min(u_rColor.r * mask.r + u_gColor.r * mask.g + u_bColor.r * mask.b, 1.0);
    gl_FragColor.g = min(u_rColor.g * mask.r + u_gColor.g * mask.g + u_bColor.g * mask.b, 1.0);
    gl_FragColor.b = min(u_rColor.b * mask.r + u_gColor.b * mask.g + u_bColor.b * mask.b, 1.0);
    gl_FragColor.a = min(u_rColor.a * mask.r + u_gColor.a * mask.g + u_bColor.a * mask.b, 1.0);
    
	gl_FragColor *= u_alpha;
}

