uniform mat4 u_matrix;
uniform mat3 u_modelMatrix;
uniform mat3 u_textureCoordinateTransform;

attribute vec4 a_vertex;
attribute vec2 a_texture;

varying vec2 v_texture;
varying vec2 v_secondTexture;

void main() 
{
	gl_Position = u_matrix * a_vertex;
    vec3 t = u_textureCoordinateTransform * vec3(a_texture.xy, 1.0);
    v_texture = t.xy / t.z;

    v_secondTexture = a_texture;
}
