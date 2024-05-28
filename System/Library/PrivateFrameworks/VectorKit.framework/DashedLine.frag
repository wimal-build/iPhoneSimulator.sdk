#define VK_STIPPLE_MAX_LENGTH 50

uniform lowp vec4 u_color;
uniform lowp sampler2D u_textureSampler;

varying highp vec2 v_texture;
varying highp float v_distance;

// Ideally this would be based on capability: <rdar://problem/12550842> Need capabilities based preprocess switching for shaders.
#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require

void main() 
{
    gl_FragColor = u_color;
    
    lowp vec4 pattern = texture2D(u_textureSampler, vec2(v_texture.x, v_distance));

    // get current framebuffer value
    highp vec4 framebuffer = gl_LastFragData[0];
    
    // apply the stipple and AA mask to the input color
    highp vec4 currentval = u_color;
    
    currentval.a *= pattern.r;
    
    // If the alpha in the framebuffer "1.0" - bend in my current value
    // since this pixel hasn't been modified yet.
    // If you change around the render order of the stipple vs the ribbon vs
    // country/state it is likely to stop working
    // NOTE: it looks like  the polys used for bodies of water and greenspace
    // have an alpha of "0.0" - once the framebuffer has a known value everywhere
    // this should be mucked around with
    if( framebuffer.a == 1.0 )
    {
        // do the alpha blend
        gl_FragColor = mix( framebuffer, currentval, currentval.a );
        // mark this pixel with my alpha
        gl_FragColor.a = currentval.a;
    }
    else if(currentval.a > framebuffer.a ) {
        // Do something special if the framebuffer has been blended, but has
        // a smaller alpha than me - This for the AA edges since there will be a
        // fall off from the AA mask we need to modify the alpha value in mix so
        // that we blend to the right color
        gl_FragColor = mix( framebuffer, currentval, currentval.a-framebuffer.a );
        gl_FragColor.a = currentval.a;
    }
    else {
        // fall through case - don't do anything if the framebuffer has been blended
        // and the alpha there is larger than mine
        gl_FragColor = framebuffer;
    }
}

#else

void main()
{
    // OS X lacks the framebuffer_fetch extension, we we must do the blending on the CPU
    lowp vec4 pattern = texture2D(u_textureSampler, vec2(v_texture.x, v_distance));
    gl_FragColor = vec4(u_color.rgb, u_color.a * pattern.r);
}

#endif
