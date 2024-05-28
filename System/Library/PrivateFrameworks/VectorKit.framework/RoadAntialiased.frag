#extension GL_OES_standard_derivatives : enable
uniform lowp vec4 u_color;
varying lowp vec2 v_texture;

void main() {

    //  The road shader we use for J6 devices where texture fetch is slow
    //
    // The roads use a circular unit texture. v_texture is the texture coordinates that vary between (-1,-1) to (1,1)
    // Here's the picture of the texture coordinates. Notice that the ends correspond to caps which should be semi circles.
    //
    // (-1,-1)  (-1,0)                                 (-1,0)  (-1,1)
    //     x------x--------------------------------------x------x
    //     |      |                                      |      |
    //     |      |                                      |      |
    //     |      |                                      |      |
    //     x------x--------------------------------------x------x
    // (1,-1)   (1,0)                                   (1,0)  (1,1)
    //
    //
    // What we want to do is draw road whenever the length of the texture coordinate vector is less than 1.
    // This will create the semi circular end caps.
    //
    // This shader essentially does this while antialiasing the result.

    lowp float radius      =   length(v_texture);                               ///< The distance from the centerline (0 <= radius <= 1.0)
    lowp vec2  n_texture   =   normalize(v_texture);                            ///< The direction from the center of the circle
                                                                                ///< We only care about changes in tecture coordinate along this vector
    lowp float edgeStep    =   max(
                                    abs(dot(dFdx(v_texture),n_texture)),        ///< How much we are moving towards the edge of the circle along x
                                    abs(dot(dFdy(v_texture),n_texture)));       ///< How much we are moving towards the edge of the circle along y
    
    lowp float alpha       =   1.0 - smoothstep(1.0-2.0*edgeStep,1.0,radius);   ///< edgeStep is the amount the taper at the edge of the circle
                                                                                ///< The factor of 2.0 in front of edgeStep softens the road edges
    
    gl_FragColor           =   u_color;
    gl_FragColor.a         *=  alpha;
}
