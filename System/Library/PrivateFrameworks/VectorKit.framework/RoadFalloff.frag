
uniform lowp vec4   u_color;
varying highp vec2  v_texture;

// Road shader for narrow roads on H6 devices.
//
// On H6 we use RoadAntialiased.frag which uses pixel derivatives.
// These derivatives get inaccurate on narrow roads where we use this shader instead
//
void main() {
    gl_FragColor            =   u_color;
    gl_FragColor.a          *=  1.0 - smoothstep(0.0,1.0,length(v_texture));    ///< A simple falloff to 0 at the edges
}
