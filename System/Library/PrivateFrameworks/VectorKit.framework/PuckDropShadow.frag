precision lowp float;

uniform float u_alphaScale;

varying float v_alpha;

void main() 
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, v_alpha*u_alphaScale);
}

