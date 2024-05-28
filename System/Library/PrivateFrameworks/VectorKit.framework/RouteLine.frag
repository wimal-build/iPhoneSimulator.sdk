#extension GL_EXT_shader_framebuffer_fetch : require

uniform lowp sampler2D u_textureSampler;
uniform lowp sampler2D u_alphaTextureSampler;
uniform lowp sampler2D u_trafficTextureSampler;

uniform highp float u_trafficTextureMappingCap;
uniform lowp vec4 u_primaryColor;

uniform lowp vec4 u_strokeColor;

uniform highp float u_splitLength;

uniform lowp vec4 u_travelledColor;

varying highp vec4  v_texture;
varying highp float v_showPattern;
varying highp vec4 v_maskTexture;
varying highp float v_lengthAlongSection;

void main() 
{
    // get current framebuffer value
    lowp vec4 framebuffer = gl_LastFragData[0];
 
    lowp float inOrOut = (abs(v_maskTexture.x) > 1.0 || abs(v_maskTexture.y) > 1.0) ? 0.0 : 1.0;
    lowp float untravelledOrNot = (u_splitLength < v_lengthAlongSection) ? 1.0 : 0.0;
    lowp vec4 baseColor = texture2D(u_textureSampler, v_texture.xy) * untravelledOrNot + u_travelledColor * (1.0 - untravelledOrNot);
    baseColor *= inOrOut;
    baseColor.rgb = min(baseColor.rgb/baseColor.a, 1.0);

    lowp vec4 strokeColor = u_strokeColor;
    lowp vec4 mask = texture2D(u_alphaTextureSampler, v_maskTexture.xy);
    lowp vec4 strokeMask = texture2D(u_alphaTextureSampler, v_maskTexture.zw);
    strokeColor.a *= strokeMask.a;

    baseColor = mix(strokeColor, baseColor, mask.a * inOrOut);

    // cut any half pattern
    highp float textureCoordinateAlongRoute = min(u_trafficTextureMappingCap, v_texture.w);
        
    // v_showPattern: if it is the end cap or fast traffic, we don't render pattern
    lowp vec4 trafficPattern = v_showPattern * ((abs(v_texture.z) < 1.0) ? 1.0 : 0.0) * texture2D(u_trafficTextureSampler, vec2(v_texture.z, textureCoordinateAlongRoute)) * untravelledOrNot;
        
    // use primarycolor.a to turn this layer on/off
    lowp vec3 color  = mix(baseColor.xyz, u_primaryColor.rgb, u_primaryColor.a * trafficPattern.b);
    lowp float alpha = max(baseColor.a, trafficPattern.b);
    
    lowp vec4 blendedColor = vec4(mix(framebuffer.xyz, color, alpha), strokeMask.a > 0.8 ? 1.0 : 0.0);
    
    gl_FragColor = framebuffer.a < 1.0 ? blendedColor : framebuffer;
}
