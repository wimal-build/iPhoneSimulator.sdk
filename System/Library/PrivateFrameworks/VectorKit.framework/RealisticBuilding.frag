#ifdef GL_ES
precision mediump float;
#endif

uniform highp vec4 u_color;
uniform highp float u_scale;
uniform mediump float u_brightness;

uniform lowp sampler2D u_textureSampler;
varying vec4 v_color;
varying vec2 v_texture;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;
varying float v_height;

void main() 
{
    gl_FragColor        =   texture2D(u_textureSampler, v_texture) * v_color;
    gl_FragColor.rbg   *=   u_brightness;

    vec4 skyColor       =   mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    
    gl_FragColor.rgb    =   mix(skyColor.rgb, gl_FragColor.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    
    gl_FragColor.rgb    =   gl_FragColor.rgb*mix(vec3(1.0,1.0,1.0),vec3(0.935,0.935,0.935), exp(-v_height*v_height));
    gl_FragColor        =   mix(u_color,gl_FragColor,u_scale);
}
