#ifdef GL_ES
precision mediump float;
#endif

uniform float u_alpha;
uniform vec4 u_color;
uniform vec4 u_gradientColor;

varying vec2 v_texture;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

void main() 
{
    vec4 gradientColor = mix(u_gradientColor, u_color, clamp(v_texture.t, 0.0, 0.8));
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, gradientColor.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    gl_FragColor.a = u_alpha;
}

