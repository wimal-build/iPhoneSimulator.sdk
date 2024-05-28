precision mediump float;

uniform sampler2D uColorSampler;
uniform samplerCube uEnvironmentSampler;

uniform vec3 uColor;
uniform vec3 uEnamelColor;
uniform bool uUseFullColorEnamel;

varying mediump vec2 vTextureCoordinate;
varying vec3 vReflectedDirection;

const float metalDiffuseMultiplier = 1.0;
const float faceMetalDiffuseMultiplier = 0.72;
const float enamelDiffuseMultiplier = 0.53;

const float metalAmbient = 0.184;
const float enamelAmbient = 0.382;
const float faceMetalAmbient = 0.265;

void main() {
    float environmentValue = textureCube(uEnvironmentSampler, vReflectedDirection).r; // r, g, b = blurrier, sharper, sharpest
    environmentValue = pow(environmentValue, 0.8) * 1.8;
    
    vec3 texValue = texture2D(uColorSampler, vTextureCoordinate).rgb;
    
    float ambient;
    float diffuse;
    
    if (uUseFullColorEnamel) {
        ambient = enamelAmbient;
        diffuse = enamelDiffuseMultiplier;
    } else {
        ambient = mix(faceMetalAmbient, enamelAmbient, texValue.g);
        diffuse = mix(faceMetalDiffuseMultiplier, enamelDiffuseMultiplier, texValue.g);
        texValue = mix(uColor, uEnamelColor, texValue.g) * texValue.r;
    }
    
    gl_FragColor = vec4((environmentValue * diffuse + ambient) * texValue, 1.0);
}
