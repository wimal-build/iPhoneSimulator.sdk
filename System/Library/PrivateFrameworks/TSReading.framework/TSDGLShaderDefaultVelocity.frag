// Default Velocity Fragment Shader

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 VelocityScale;

varying vec4 v_PrevPos;
varying vec4 v_ThisPos;

void main()
{
    /* Divide by the w-coordinates to get 3D positions. */
    vec2 posA = v_PrevPos.xy / v_PrevPos.w;
    vec2 posB = v_ThisPos.xy / v_ThisPos.w;
    
    /* Subtract the positions and scale to get velocity. */
    vec2 veloc = (posB.xy - posA.xy) * VelocityScale;
    
    /* Clamp the velocity to a max magnitude of 1.0. */
    float vmax = max(abs(veloc.x), abs(veloc.y));
    veloc = veloc/max(vmax, 1.0);
    /* Remap from [-1,1] to [0,1] */
    veloc = vec2(0.5) + 0.5*veloc;
    gl_FragColor.xy = veloc;
    
    /* Write white if we touched this pixel, otherwise black. */
    gl_FragColor.z = 1.0;
    
    /* Make alpha 1.0 for readability. */
    gl_FragColor.w = 1.0;
}
