
precision highp float;

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
    float   distantLightBrightness  =   0.35;
    float   distantLightWashout     =   2.0;
    
    /// Local (camera) light parameters
    float   localLightBrightness    =   0.235;
    vec3    localLightDirection     =   normalize(u_cameraPositionInTileSpace - scaled_vertex.xyz);
    float   localLightWashout       =   1.0;
    
    /// Ambient light parameters
    float   ambientLightBrightness  =   0.5;
    
    /// The size of the gradient height at the bottom of the buildings. The smaller this number, the smaller the gradient
    float   bottomGradientHeight    =   0.004;
    
    ///
    ////////////////////////////////////////////////////////////
    
    
    
    v_maxGradient = u_scale*(
    
            // Minimum of the scene brightness and
            min(maxSceneBrightness,
            
                // The local light contribution (since it is hard coded to be top down, we can do this optimization)
                ((dot(localLightDirection, a_normal) + localLightWashout)  / (localLightWashout+1.0)) * localLightBrightness +
                
                // The distant light contribution
                //((dot(distantLightDirection, a_normal) + distantLightWashout)  / (distantLightWashout+1.0)) * distantLightColor +
                ((a_normal.z + distantLightWashout)  / (distantLightWashout+1.0)) * distantLightBrightness +
                
                // The ambient light contribution
                 ambientLightBrightness));
    
    v_gradient  =   (0.040584 * scaled_vertex.z / bottomGradientHeight + 0.935)*v_maxGradient;
    v_texture       =   a_texture;
}
