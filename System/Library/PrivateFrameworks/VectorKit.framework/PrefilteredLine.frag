uniform lowp vec4 u_color;

varying highp vec3 v_line;

void main()
{
    gl_FragColor = u_color;
    gl_FragColor.a *= 1.0-smoothstep(0.0, 1.0, abs(dot(vec3(gl_FragCoord.xy, 1.0), v_line)));
}