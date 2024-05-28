precision lowp float;

varying vec4 coordinateAndMainEndCenter;
varying mediump vec3 percentages; // x, y, z = main, percentageScaleFactor, mod(main, 1.0)
varying vec4 color1;
varying vec4 color2;
varying vec2 cosAndSinResult;
varying vec4 sizes; // x, y, z, w = size, innerRadius, halfRingWidth, midRadius
varying vec2 percentageOverflowOffsets;
varying float coordinatePercent;

const float ringDimFactor = 0.15;
const float oneMinusRingDimFactor = 0.85;

void main() {
    vec2 coordinate = coordinateAndMainEndCenter.xy;
    vec2 mainEndCenter = coordinateAndMainEndCenter.zw;
    float centerDistance = length(coordinate);
    float size = sizes.x;
    float halfRingWidth = sizes.z; // Precomputed as (1.0 - innerRadius) * 0.25
    float midRadius = sizes.w;     // Precomputed as (1.0 + innerRadius) * 0.25
    
    vec2 unused = vec2(percentageOverflowOffsets.x, cosAndSinResult.x);
    
    float ringDistance = abs(centerDistance - midRadius) - halfRingWidth;
    float alpha = max(1.0 - ringDistance * size, 0.0);
    
    vec2 startAndEndCapLengths = (vec2(length(coordinate - vec2(0.0, halfRingWidth - 0.5)),
                                       length(coordinate - mainEndCenter)) - halfRingWidth) * vec2(size);
    
    float startCapDistanceInPixels = startAndEndCapLengths.x;
    float endCapDistanceInPixels = startAndEndCapLengths.y;
    
    // Dimmed portion of the ring between main percentage and 100%
    float colorMultiplier;
    if (coordinatePercent > percentages.x) {
        colorMultiplier = ringDimFactor;
    } else {
        colorMultiplier = 1.0;
    }
    
    // Start and end cap
    colorMultiplier = clamp(1.0 - min(startCapDistanceInPixels, endCapDistanceInPixels) * oneMinusRingDimFactor, colorMultiplier, 1.0);
    
    // How far to stretch this color, mixing between start and end
    vec4 color = mix(color1, color2, coordinate.y);
    color *= vec4(colorMultiplier, colorMultiplier, colorMultiplier, alpha);
    
    gl_FragColor = color;
}
