/*
 *  TLVibrationRippleEffect.fsh
 *  ToneLibrary
 *
 *  Created by Joel Lopes Da Silva on 3/31/11.
 *  Copyright © 2011 Apple Inc. All rights reserved.
 *
 */

#ifdef GL_ES
// define default precision for float, vec, mat.
precision highp float;
#endif

uniform sampler2D rippleTexture;

varying vec2 varyingRippleTextureCoordinates;
varying vec2 varyingRippleTextureColorCoefficients;

void main() {
    gl_FragColor = texture2D(rippleTexture, varyingRippleTextureCoordinates) * varyingRippleTextureColorCoefficients.x + varyingRippleTextureColorCoefficients.y;
}
