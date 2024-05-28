uniform lowp vec4 u_polygonColor;

uniform lowp vec4 u_strokeColor;
uniform lowp sampler2D u_textureSampler;
varying highp vec2 v_stroketexture;
varying highp vec2 v_polygontexture;

void main() 
{
    lowp vec4 strokemask = texture2D(u_textureSampler, v_stroketexture);
    lowp vec4 polygonColor;
    polygonColor = u_polygonColor;
    lowp vec2 polygonTextureCoord = clamp(v_stroketexture, 0.0, 1.0);
    lowp float polygonalpha = polygonTextureCoord.x * (1.0 - strokemask.a);
    gl_FragColor = vec4(mix(u_strokeColor.rgb, polygonColor.rgb, polygonTextureCoord.x), (strokemask.a + polygonalpha) * u_strokeColor.a);
}
