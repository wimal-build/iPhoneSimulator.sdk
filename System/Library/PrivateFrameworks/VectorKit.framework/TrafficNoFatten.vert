precision highp float;

uniform mat4 u_matrix;
uniform float u_lineWidth;
uniform float u_textureMappingGlobalScaler;
uniform float u_zoomShift;
uniform float u_drivingDirection;

attribute vec4 a_vertex;
attribute vec2 a_offset;    // AKA normal to road direction
attribute vec2 a_end;
attribute vec2 a_texture;
attribute float a_shift;
varying vec2 v_texture;

#define COLOR_END 0

void main()
{
    vec4 vert = a_vertex;
    
    // displacement:
    {
        vec2 offset = a_offset * u_lineWidth;
        
        // bi direcitonal road always shift. uni directional road shift depends on u_zoomShift
        vec2 bidi_offset = offset * (1.0 + a_texture.x * u_drivingDirection * (1.0 - a_shift * u_zoomShift));
        
        vert.xy += bidi_offset;
    }


    // texture mapping:
    {
        v_texture = a_texture;
    
        // a_texture.y was in original tile space
        v_texture.y *= u_textureMappingGlobalScaler;

        // are we at the ends that needs to extrude?
        // dot is faster on vector chip than abs
        if (dot(a_end, a_end)>0.0)
        {
            float tangentCoordinateCeiling = ceil(v_texture.y);
        
            // This stretches out the last quad so we always end with an full number
            // of textures without having to scrunch the texture.
            float extraCoordinate = tangentCoordinateCeiling - v_texture.y;
        
            // displace further
            // u_lineWidth is approximately 1.0f/u_textureMappingGlobalScaler but cheaper
            vert.xy += a_end * u_lineWidth * extraCoordinate;
            
            v_texture.y= tangentCoordinateCeiling;
        }
    }
    
    gl_Position = u_matrix * vert;
}
