
precision mediump float;

uniform float u_gridMix;

uniform vec4 u_lineParams; // max(0,majorw-1), max(1,majorw),max(0,minorw-1), max(1,minorw),

uniform highp vec4 u_color;
uniform highp vec4 u_lineColor;

varying highp vec4 v_majorMinorVertex;

#extension GL_OES_standard_derivatives : enable

void main()
{    
    // Major lines in XY & Minor lines ZW
    vec4 v = v_majorMinorVertex;
    
    vec4 f  = abs(fract(v-0.5)-0.5 );
	vec4 df = fwidth(v);
    
    // repack the line width parameters
    vec4 mi = vec4( u_lineParams.x, u_lineParams.x, u_lineParams.z, u_lineParams.z );
    vec4 ma = vec4( u_lineParams.y, u_lineParams.y, u_lineParams.w, u_lineParams.w );
    
    // note - lines must be at least 1.0 pixel wide since we are hard coding the clamp to 0.0
    vec4 g = clamp((f-df*mi)/(df*(ma-mi)), 0.0, 1.0 );

    // compute mjor and minor grid amount
    float major = min(g.x, g.y);
    float minor = min(g.z, g.w);
    
    // mix the major and minor grid lines together
    float grid = mix( minor, major, u_gridMix );
 
    // mix the line and background color together
    gl_FragColor = u_lineColor * (1.0-grid) + u_color * grid;
}