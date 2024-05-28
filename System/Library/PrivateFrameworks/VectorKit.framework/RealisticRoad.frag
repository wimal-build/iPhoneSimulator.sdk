#ifdef GL_ES
precision mediump float;
#endif

uniform mediump sampler2D u_textureSampler;
uniform float u_alpha;

varying vec2 v_texture;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

void main() 
{
    gl_FragColor = texture2D(u_textureSampler, v_texture);
    gl_FragColor.a *= u_alpha;
    
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, gl_FragColor.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
}
