uniform float u_skyStartOffset;
attribute vec4 a_vertex;

void main() 
{
    gl_Position = vec4(-1.0+a_vertex.x*2.0, -1.0+2.0*u_skyStartOffset+a_vertex.y*2.0*(1.0-u_skyStartOffset), 1.0, 1.0);
}

