#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_matrix;
uniform mediump float u_brightness;
uniform vec3 u_cameraPositionInTileSpace;
uniform float u_scale;
uniform float u_alpha;
uniform vec4 u_facadeColor;
uniform vec4 u_topColor;

attribute vec4 a_vertex;    // position
attribute vec3 a_normal;
attribute float a_isFacade;

varying vec4 v_color;

// Fog support
uniform mat4 u_modelViewMatrix;
uniform highp float u_horizonDepth;
varying highp float v_fogCoordinate;
uniform highp vec4 u_fogSlope;
uniform highp float u_fogOffset;

varying float height;

void main() 
{
    vec4 scaled_vertex = a_vertex;
    scaled_vertex.z = scaled_vertex.z * u_scale;
	gl_Position = u_matrix * scaled_vertex;
    
    ////////////////////////////////////////////////////////////
    ///


    /// Maximum scene brightness
    float   maxSceneBrightness      =   0.98;

    /// Distant light parameters
    float   distantLightBrightness  =   0.35;
    //vec3    distantLightDirection   =   normalize(vec3(0.0,0.0,1.0));
    vec3    distantLightColor       =   vec3(distantLightBrightness,distantLightBrightness,distantLightBrightness);
    float   distantLightWashout     =   2.0;
    
    /// Local (camera) light parameters
    float   localLightBrightness    =   0.235;
    vec3    localLightDirection     =   normalize(u_cameraPositionInTileSpace - scaled_vertex.xyz);
    vec3    localLightColor         =   vec3(localLightBrightness,localLightBrightness,localLightBrightness);
    float   localLightWashout       =   1.0;
    
    /// Ambient light parameters
    float   ambientLightBrightness  =   0.5;
    vec3    ambientLightColor       =   vec3(ambientLightBrightness,ambientLightBrightness,ambientLightBrightness);
    
    /// The size of the gradient height at the bottom of the buildings. The smaller this number, the smaller the gradient
    float   bottomGradientHeight    =   0.004;
    
    ///
    ////////////////////////////////////////////////////////////
    
    height  =   scaled_vertex.z / bottomGradientHeight;
        
    v_color = u_facadeColor*a_isFacade + u_topColor*(1.0 - a_isFacade);
    v_color.rgb = v_color.rgb * (
    
            // Minimum of the scene brightness and
            min(vec3(maxSceneBrightness,maxSceneBrightness,maxSceneBrightness),
            
                // The local light contribution (since it is hard coded to be top down, we can do this optimization)
                ((dot(localLightDirection, a_normal) + localLightWashout)  / (localLightWashout+1.0)) * localLightColor +
                
                // The distant light contribution
                //((dot(distantLightDirection, a_normal) + distantLightWashout)  / (distantLightWashout+1.0)) * distantLightColor +
                ((a_normal.z + distantLightWashout)  / (distantLightWashout+1.0)) * distantLightColor +
                
                // The ambient light contribution
                 ambientLightColor));
    v_color.rgb *= u_brightness;
    v_color.a *= u_alpha;
    
    v_fogCoordinate = dot(u_fogSlope, a_vertex) + u_fogOffset;
}
