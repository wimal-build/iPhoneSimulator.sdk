attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoordinate;

uniform mat4 uViewProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uEnvironmentMatrix;
uniform vec3 uCameraPosition;

varying mediump vec2 vTextureCoordinate;
varying mediump vec3 vReflectedDirection;

void main() {
    vTextureCoordinate = aTextureCoordinate;
    
    vec4 worldPosition = uModelMatrix * vec4(aPosition, 1.0);
    vec3 toCamera = normalize(uCameraPosition - worldPosition.xyz);
    vec3 normalizedNormal = normalize(aNormal);
    
    vec3 toCameraReflectedToNormalizedNormal = reflect(toCamera, normalizedNormal);
    vReflectedDirection = (uEnvironmentMatrix * uModelMatrix * vec4(toCameraReflectedToNormalizedNormal, 1.0)).xyz;
    
    gl_Position = uViewProjectionMatrix * worldPosition;
}
