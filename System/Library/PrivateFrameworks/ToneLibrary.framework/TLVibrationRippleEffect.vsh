/*
 *  TLVibrationRippleEffect.vsh
 *  ToneLibrary
 *
 *  Created by Joel Lopes Da Silva on 3/31/11.
 *  Copyright © 2011 Apple Inc. All rights reserved.
 *
 */

uniform mat4 modelViewProjectionMatrix;
uniform mat4 rippleTextureModelViewProjectionMatrix;

attribute vec4 position;
attribute vec2 rippleTextureCoordinates;
attribute vec2 rippleTextureColorCoefficients;

varying vec2 varyingRippleTextureCoordinates;
varying vec2 varyingRippleTextureColorCoefficients;

void main() {
    
    // Position
    gl_Position = modelViewProjectionMatrix * position;
    
    // Ripple texture coordinates
    vec4 spatialTextureCoordinates = vec4(rippleTextureCoordinates.x, rippleTextureCoordinates.y, 0.0, 1.0);
    vec4 transformedSpatialTextureCoordinates = rippleTextureModelViewProjectionMatrix * spatialTextureCoordinates;
    varyingRippleTextureCoordinates = transformedSpatialTextureCoordinates.xy;
    
    // Color coefficients
    varyingRippleTextureColorCoefficients = rippleTextureColorCoefficients;
    
}
