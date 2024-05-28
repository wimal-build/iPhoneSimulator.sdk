#ifdef GL_ES
precision mediump float;
#endif

// background color - we are computing the where the grid isn't instead of where it is
uniform highp vec4 u_color;

// fake derivative from the application
uniform vec2 u_invFwidth;

// the grid vertex
varying vec2 v_vertex;

void main()
{
    vec2 f  = abs(fract(v_vertex)-0.5)*u_invFwidth;
    float grid = min(f.x,f.y);
    
    // To save a math op, we're actually going to draw the background color in the shader
    // and set the clear color to the line color (this is enough to give a couple more fps)
    gl_FragColor.rgb = u_color.rgb;
    gl_FragColor.a = grid;

}