precision lowp float;

varying vec4 coordinateAndMainEndCenter;
varying mediump vec3 percentages; // x, y, z = main, percentageScaleFactor, mod(main, 1.0)
varying vec4 color1;
varying vec4 color2;
varying vec2 cosAndSinResult;
varying vec4 sizes; // x, y, z, w = size, innerRadius, halfRingWidth, midRadius
varying vec2 percentageOverflowOffsets;
varying float coordinatePercent;

// Make sure these constants are kept in sync with the ones in the ring start fragment shader
const float ringDimFactor = 0.15;
const float oneMinusRingDimFactor = 0.85;
const float endCapShadowDistance = 0.12;
const float oneMinusEndCapShadowAlpha = 0.7;

void main() {
	vec2 coordinate = coordinateAndMainEndCenter.xy;
    vec2 mainEndCenter = coordinateAndMainEndCenter.zw;
	float centerDistance = length(coordinate);
	float size = sizes.x;
	float innerRadius = sizes.y;
    float halfRingWidth = sizes.z; // Precomputed as (1.0 - innerRadius) * 0.25
    float midRadius = sizes.w;     // Precomputed as (1.0 + innerRadius) * 0.25
    
	float ringDistance = abs(centerDistance - midRadius) - halfRingWidth;
	float alpha = clamp(1.0 - ringDistance * size, 0.0, 1.0);
    
    // Convert from cartesian -> polar coordinates; centerDistance is the radius, coordinateAngle is the theta
    // This is now precomputed in the vertices and interpolated as a varying (coordinatePercent)
    //float coordinateAngle = atan(coordinate.x, coordinate.y);
    
    float endCapDistanceInPixels = (length(coordinate - mainEndCenter) - halfRingWidth) * size;
    
    vec2 vektor = cosAndSinResult;
    float pixelEndCapDotProduct = dot(coordinate - mainEndCenter, vektor);
    
    // Dimmed portion of the ring between main percentage and 100%
    float colorMultiplier;
	if (coordinatePercent > percentages.x) {
		colorMultiplier = ringDimFactor;
    } else {
        colorMultiplier = 1.0;
    }
    
    // Save this off for color calculations later
    float colorPercentageMultiplier = colorMultiplier;

    // End cap
    colorMultiplier = clamp(1.0 - endCapDistanceInPixels * oneMinusRingDimFactor, colorMultiplier, 1.0);
    
    // Shadow end cap
    // To anti-alias, smoothly go from 0-1 over the distance of one pixel
    // In this case, we're starting 1px in from the real edge,
    // then increasing to 100% shadow over the course of that 1px
    float antiAliasingFactor = min(endCapDistanceInPixels, 1.0 / size);
    
    // When shadowAmount is 1.0, the shadow is at its darkest; it fades out to 0.0
    // Using this step() result here as the max value for the clamp
    // has the same effect as doing if (pixelEndCapDotProduct > 0.0) { do shadow calculations }
    mediump float shadowAmount = clamp(1.0 - endCapDistanceInPixels / (endCapShadowDistance * size) + antiAliasingFactor, 0.0, step(0.0, pixelEndCapDotProduct));
    float curvedShadowAmount = shadowAmount * shadowAmount * shadowAmount;
    
    // Apply the shadow by baking it in to the color multiplier
    colorMultiplier *= 1.0 - oneMinusEndCapShadowAlpha * curvedShadowAmount;
    
    
    // If the ring percentage goes over 1.0, continue to have it "draw over" the existing ring
    float pixelAngleAsPercent;
    if ((/*coordinatePercent >= percentages.z ||*/ pixelEndCapDotProduct > -0.025) && (endCapDistanceInPixels < halfRingWidth)) {
        pixelAngleAsPercent = percentages.z + percentageOverflowOffsets.x;
        // Don't floor the color when in the end cap itself
        colorPercentageMultiplier = 1.0;
    } else if (coordinatePercent < percentages.z) { // percentages.z = mod(percentages.x, 1.0)
        pixelAngleAsPercent = coordinatePercent + percentageOverflowOffsets.x;
    } else {
        pixelAngleAsPercent = coordinatePercent + percentageOverflowOffsets.y;
    }
    
    
    // How far to stretch this color, mixing between start and end
    float percentageScaleFactor = percentages.y;
    
    // If in the unfilled ring background, use the key color, as specced.
    // By flooring the value here, we effectively get 0 if it's dimmed,
    // making us mix to the key color, or 1 if it's not, using the normal
    // coloration logic.
    // To keep the end cap shadow from being miscolored, we add oneMinusEndCapShadowAlpha
    colorPercentageMultiplier *= floor(colorPercentageMultiplier + oneMinusEndCapShadowAlpha);
    
    vec4 color = mix(color1, color2, pixelAngleAsPercent * percentageScaleFactor * colorPercentageMultiplier);
    
	color *= vec4(colorMultiplier, colorMultiplier, colorMultiplier, alpha);
    
	gl_FragColor = color;
}
