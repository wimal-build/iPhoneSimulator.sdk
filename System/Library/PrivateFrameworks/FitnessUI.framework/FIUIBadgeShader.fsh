precision mediump float;

uniform sampler2D uColorSampler;
uniform samplerCube uEnvironmentSampler;

uniform vec3 uColor;
uniform float uUseTexture;
uniform float uUseTextureShine;

varying mediump vec2 vTextureCoordinate;
varying vec3 vReflectedDirection;

const float metalDiffuseMultiplier = 1.0;
const float metalAmbient = 0.184;

void main() {
    vec4 environmentValueCombined = textureCube(uEnvironmentSampler, vReflectedDirection);
    vec4 rawTexValueRGBA = texture2D(uColorSampler, vTextureCoordinate);
    vec3 rawTexValue = rawTexValueRGBA.rgb;
    
    float environmentValue = mix(environmentValueCombined.g, environmentValueCombined.r, uUseTexture);
    
    // Add the shine!
    float useTextureShineTimesTexAlpha = uUseTextureShine * rawTexValueRGBA.a;
    environmentValue = mix(environmentValue, environmentValueCombined.b, useTextureShineTimesTexAlpha);
    rawTexValue = mix(vec3(1.0), vec3(environmentValueCombined.b), useTextureShineTimesTexAlpha);
    
    environmentValue = pow(environmentValue, 0.8) * 1.8;
    
    float ambient = metalAmbient;
    float diffuse = metalDiffuseMultiplier;
    vec3 texValue = 1.0 + (rawTexValue - 1.0) * uUseTexture;
    
    texValue *= uColor;
    
    gl_FragColor = vec4((environmentValue * diffuse + ambient) * texValue, 1.0);
}
