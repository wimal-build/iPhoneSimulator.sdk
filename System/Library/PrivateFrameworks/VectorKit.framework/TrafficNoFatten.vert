#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform float u_lineWidth;
// quantization of 1 / u_lineWidth
uniform float u_textureMappingGlobalScaler;
uniform float u_zoomShift;
uniform float u_drivingDirection;
const float u_phaseOffset = 0.0;
uniform mediump vec4 u_trafficPattern;

attribute vec4 a_vertex;
attribute vec2 a_offset;

// tangent and turn factor
attribute vec4 a_normal;
attribute float a_shift;

// x: left or right, y: front or end, z: cap?
attribute vec3 a_index;

varying vec3 v_texture;
varying vec4 v_clamp;

// line width is the unit 1
float objectToParameterSpace(float objectSpacePos)
{
    return u_textureMappingGlobalScaler * objectSpacePos;
}

float parameterSpaceToObjectSpace(float parameterSpacePos)
{
    return parameterSpacePos / u_textureMappingGlobalScaler;
}

float parameterSpaceToObjectSpaceCheap(float parameterSpacePos)
{
    return parameterSpacePos * u_lineWidth;
}

// pattern length is the unit 1
float objectToPixelShaderSpace(float objectSpacePos)
{
    return objectToParameterSpace(objectSpacePos) / u_trafficPattern.x - u_phaseOffset;
}

vec4 clampVectorToPixelSpace()
{
    vec2 offsetClamp   = u_textureMappingGlobalScaler / u_trafficPattern.x * a_offset - u_phaseOffset;
    float endFadeClamp = floor(offsetClamp.y);

    return vec4(offsetClamp, a_index.y < 0.0 ? 0.0 : a_index.z, endFadeClamp);
}

float pixelToParameterSpace(float pixelSpacePos)
{
    return u_trafficPattern.x * pixelSpacePos;
}

float parameterSpaceToPixelShaderSpace(float parameterSpacePos)
{
    return parameterSpacePos / u_trafficPattern.x;
}

// object space
vec4 vertexPosition(vec4 a_vertex)
{
    return vec4(a_index.y < 0.0 ? a_vertex.xy : a_vertex.zw, 0.0, 1.0);
}

// object space
vec2 extrude(float cornerOffsetInObjectSpace)
{
    return cornerOffsetInObjectSpace * a_normal.xy;
}

void main()
{
    float circleRadiusInPixelShaderSpace    = sqrt(u_trafficPattern.w);
    float circleRadiusInParameterSpace      = circleRadiusInPixelShaderSpace * u_trafficPattern.x;
    float centerLineShiftInParameterSpace   = u_drivingDirection * (1.0 - a_shift * u_zoomShift);
    float sideExtrudeInParameterSpace       = a_index.x * circleRadiusInParameterSpace + centerLineShiftInParameterSpace;
    float currentVertexOffsetInObjectSpace  = (a_index.y < 0.0 ? a_offset.x : a_offset.y);
    float currentVertexOffsetInSegmentSpace = fract(objectToPixelShaderSpace(currentVertexOffsetInObjectSpace));
    float distanceToCenter                  = currentVertexOffsetInSegmentSpace - 0.5;
    
    float centerOffsetInParameterSpace      = centerLineShiftInParameterSpace * (a_index.y < 0.0 ? a_normal.z : a_normal.w);
    float centerOffsetInPixelShaderSpace    = parameterSpaceToPixelShaderSpace(centerOffsetInParameterSpace);
    
    float cornerOffsetInPixelShaderSpace    = 0.0;
    if (abs(distanceToCenter) > u_trafficPattern.y / u_trafficPattern.x) {
        cornerOffsetInPixelShaderSpace = centerOffsetInPixelShaderSpace - currentVertexOffsetInSegmentSpace + (distanceToCenter > 0.0 ? 1.0 : 0.0);
    } else if (a_index.z == 0.0) {
        cornerOffsetInPixelShaderSpace = parameterSpaceToPixelShaderSpace(sideExtrudeInParameterSpace * (a_index.y < 0.0 ? a_normal.z : a_normal.w));
    } else {
        cornerOffsetInPixelShaderSpace = centerOffsetInPixelShaderSpace + circleRadiusInPixelShaderSpace * a_index.y;
    }

    float cornerOffsetInObjectSpace    = parameterSpaceToObjectSpaceCheap(pixelToParameterSpace(cornerOffsetInPixelShaderSpace));
    
    vec4 vert   = vertexPosition(a_vertex);
    // displace along normal
    vert.xy    += sideExtrudeInParameterSpace * u_lineWidth * vec2(a_normal.y, -a_normal.x);

    // displace along tangent
    vert.xy    += extrude(cornerOffsetInObjectSpace);

    v_clamp     = clampVectorToPixelSpace();

    // texture mapping:
    v_texture   = vec3(a_index.x * circleRadiusInPixelShaderSpace,
                       objectToPixelShaderSpace(currentVertexOffsetInObjectSpace) + cornerOffsetInPixelShaderSpace - centerOffsetInPixelShaderSpace,
                       v_clamp.y - v_clamp.w);

    gl_Position = u_matrix * vert;
}
