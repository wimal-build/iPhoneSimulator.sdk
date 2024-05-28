#version 100

uniform sampler2D uTexture;
uniform mediump vec4 uColor;

varying mediump vec2 vTexCoord;

void main()
{
    gl_FragColor = uColor*texture2D(uTexture, vTexCoord).r;
}
