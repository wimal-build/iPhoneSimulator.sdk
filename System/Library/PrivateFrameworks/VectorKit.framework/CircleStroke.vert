
uniform mat4 u_matrix;
uniform vec2 u_halfScreenDims;

//Used for determing pixel size
uniform vec3 u_localEyePos;
uniform vec3 u_localEyeDir;
uniform float u_tanHalfHorizFOV;

attribute vec4 a_vertex;
attribute vec2 a_offset;
attribute vec2 a_texture;

varying vec2 v_texture;

void main() 
{
    v_texture = a_texture;
    
    vec4 v = a_vertex;
    
    float depth = dot(v.xyz - u_localEyePos, u_localEyeDir);
    float w = u_tanHalfHorizFOV * depth;
    float pixelSizeInLocalCoords = w / u_halfScreenDims.x;
    
    v.x += a_offset.x * pixelSizeInLocalCoords;
    v.y += a_offset.y * pixelSizeInLocalCoords;
	gl_Position = u_matrix * v;
}
