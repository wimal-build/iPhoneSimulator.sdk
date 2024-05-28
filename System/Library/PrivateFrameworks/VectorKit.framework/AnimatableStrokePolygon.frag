
uniform bool u_isToBeStroked;
uniform bool u_isPolygonSolidColor;
uniform lowp vec4 u_polygonColor;

uniform lowp vec4 u_strokeColor;
uniform lowp sampler2D u_textureSampler;
uniform lowp sampler2D u_texturePolygonSampler;
varying highp vec2 v_stroketexture;
varying highp vec2 v_polygontexture;

uniform lowp sampler2D u_textureVariantSampler;
uniform mediump float u_textureVariation;

void main() 
{
    // calc all of the independent stuff
    lowp vec4 strokemask = texture2D(u_textureSampler, v_stroketexture);
    lowp vec4 polygonColor;
    if (u_isPolygonSolidColor)
        polygonColor = u_polygonColor;
    else {
        lowp vec4 texStart = texture2D(u_texturePolygonSampler, v_polygontexture);
        lowp vec4 texEnd = texture2D(u_textureVariantSampler, v_polygontexture);
        polygonColor = (1.0 - u_textureVariation) * texStart + u_textureVariation * texEnd;
    }

    // calc final color based on mode we are in
    if (u_isToBeStroked) {
        lowp vec2 polygonTextureCoord = clamp(v_stroketexture, 0.0, 1.0);
        lowp float polygonalpha = polygonTextureCoord.x * (1.0 - strokemask.a);
        gl_FragColor = vec4(mix(u_strokeColor.rgb, polygonColor.rgb, polygonTextureCoord.x), (strokemask.a + polygonalpha) * u_strokeColor.a);
    } else {
        lowp vec2 polygonTextureCoord = (v_stroketexture + 1.0) / 2.0;
        lowp float polygonalpha = polygonTextureCoord.x * (1.0 - strokemask.a);
        gl_FragColor = vec4(polygonColor.rgb, polygonalpha);
    }
}
