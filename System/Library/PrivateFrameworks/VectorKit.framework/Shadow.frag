#ifdef GL_ES
precision mediump float;
#endif

uniform float u_ramp;
uniform float u_taper;
uniform mediump float u_brightness;

varying vec2 v_texture;
varying vec4 v_color;
varying float v_alpha;
varying float v_distance;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

void main() 
{
    float s = v_texture.s * min(1.0, v_texture.t / u_taper);
    s *= min( (1.0 - (v_texture.t - v_distance + u_taper) / u_taper), 1.0);
        
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, v_color.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    gl_FragColor.rgb *= u_brightness;
    gl_FragColor.a = (s*s*u_ramp) * v_alpha;
}
