precision mediump float;
varying vec4 v_color;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

varying float height;

void main() 
{
    gl_FragColor = v_color;
    
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    gl_FragColor.rgb = mix(skyColor.rgb, gl_FragColor.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    gl_FragColor.rgb    =   gl_FragColor.rgb*mix(vec3(1.0,1.0,1.0),vec3(0.935,0.935,0.935), exp(-height*height));
}
