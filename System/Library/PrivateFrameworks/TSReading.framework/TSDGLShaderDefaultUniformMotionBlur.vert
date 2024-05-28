// Default Uniform Motion Blur Vertex Shader

#ifdef GL_ES
precision highp float;
#endif

uniform vec2    MotionBlurVector;
uniform vec4    TextureSize;
uniform mat4    MVPMatrix;

attribute vec2  Position;
attribute vec2  TexCoord;
attribute vec2  Center;

varying vec2 v_TexCoords[BLUR_SAMPLES];

void main()
{
    // Grow bounding box
    vec2 centerVector = Position - Center;
    vec2 positionOffset = MotionBlurVector *
        vec2(centerVector.x*MotionBlurVector.x > 0.0 ? 1.0 : -1.0,
             centerVector.y*MotionBlurVector.y > 0.0 ? 1.0 : -1.0);
    
    vec2 texCoordOffset = positionOffset*TextureSize.zw; // Dividing
    vec2 thisTexCoord = TexCoord - texCoordOffset;
    texCoordOffset = abs(texCoordOffset);
    
    for (int i=0; i<BLUR_SAMPLES; i++) {
        v_TexCoords[i] = thisTexCoord + texCoordOffset * (0.5-(float(i)/float(BLUR_SAMPLES-1)));
    }
    
    gl_Position = MVPMatrix * vec4(Position + positionOffset, 0, 1);
}
