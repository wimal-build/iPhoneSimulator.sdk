#ifdef GL_ES
precision mediump float;
#endif

uniform lowp sampler2D u_textureSampler;
uniform lowp sampler2D u_travelledTextureSampler;
varying highp vec2 v_texture;
varying highp float v_lengthAlongSection;

uniform highp float u_splitLength;

uniform lowp float u_brightness;

// Fog support
uniform float u_screenHeight;
uniform float u_skyOffset;
uniform vec4 u_skyBottomColor;
uniform vec4 u_skyTopColor;
varying float v_fogCoordinate;

#extension GL_EXT_shader_framebuffer_fetch : require

void main() 
{
    vec4 currentval = (u_splitLength < v_lengthAlongSection) ? texture2D(u_textureSampler, v_texture) : texture2D(u_travelledTextureSampler, v_texture);
    currentval.rgb *= u_brightness;
    
    vec4 skyColor = mix(u_skyBottomColor, u_skyTopColor, gl_FragCoord.y*u_screenHeight-u_skyOffset);
    currentval.rgb = mix(0.75*skyColor.rgb, currentval.rgb, clamp(v_fogCoordinate, 0.0, 1.0));
    
    vec4 framebuffer = gl_LastFragData[0];

    if(framebuffer.a > 0.99)
    {
        // do the alpha blend
        gl_FragColor = (currentval + (1.0-currentval.a)*framebuffer);
        // mark this pixel with my alpha
        gl_FragColor.a = currentval.a;
    } else {
        // fall through case - don't do anything if the framebuffer has been blended
        gl_FragColor = framebuffer;
    }
}
