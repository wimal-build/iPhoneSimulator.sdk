#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform lowp vec4 u_color;
uniform lowp float u_scale;
uniform vec3 u_cameraPositionInTileSpace;

attribute vec4 a_vertex;    // position
attribute vec3 a_normal;

varying lowp float v_maxGradient;

attribute vec2 a_texture;
varying lowp vec2 v_texture;

varying lowp float v_gradient;

void main() 
{
    vec4 scaled_vertex  = a_vertex;
    scaled_vertex.z     = scaled_vertex.z * u_scale;
	gl_Position         = u_matrix * scaled_vertex;
    
    ////////////////////////////////////////////////////////////
    ///


    /// Maximum scene brightness
    float   maxSceneBrightness      =   0.98;

    /// Distant light parameters
    float   distantLightWashout     =   2.0;
    float   distantLightScale       =   0.116667;
    
    /// Local (camera) light parameters
    vec3    localLightDirection     =   normalize(u_cameraPositionInTileSpace - scaled_vertex.xyz);
    float   localLightWashout       =   1.0;
    float   localLightScale         =   0.1175;
    
    /// Ambient light parameters
    float   ambientLightBrightness  =   0.5;
    
    ///
    ////////////////////////////////////////////////////////////
    
    
    
    v_maxGradient = u_scale*(
    
            // Minimum of the scene brightness and
            min(maxSceneBrightness,
            
                // The local light contribution (since it is hard coded to be top down, we can do this optimization)
                (dot(localLightDirection, a_normal) + localLightWashout) * localLightScale +
                
                // The distant light contribution
                //((dot(distantLightDirection, a_normal) + distantLightWashout)  / (distantLightWashout+1.0)) * distantLightColor +
                (a_normal.z + distantLightWashout) * distantLightScale +
                
                // The ambient light contribution
                 ambientLightBrightness));
    
    v_gradient  =   (10.146 * scaled_vertex.z + 0.935)*v_maxGradient;
    v_texture   =   a_texture;
}
