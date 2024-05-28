
uniform mat4 u_matrix;
uniform highp float u_canvasWidth;
uniform highp float u_canvasHeight;
uniform highp float u_halfWidth;
uniform lowp float u_zScale;
uniform highp vec4 u_vertexOffset;

attribute vec4 a_vertex;
attribute vec4 a_secondVertex;
attribute float a_index;    // 0 if first vertex in line, 1 if 2nd vertex in line

varying highp vec3 v_line;

void main() 
{
    vec4 firstVertex = a_vertex;
    firstVertex.z *= u_zScale;
    firstVertex += u_vertexOffset;
    
    vec4 secondVertex = a_secondVertex;
    secondVertex.z *= u_zScale;
    secondVertex += u_vertexOffset;

	gl_Position = u_matrix * (a_index < 0.5 ? firstVertex : secondVertex);

    // Transform endpoints to pixel coordinates
    highp vec4 p0 = u_matrix * firstVertex;
    highp vec4 p1 = u_matrix * secondVertex;
    p0 /= p0.w;
    p1 /= p1.w;
    p0.x = (p0.x + 1.0) * 0.5 * u_canvasWidth;
    p0.y = (p0.y + 1.0) * 0.5 * u_canvasHeight;
    p1.x = (p1.x + 1.0) * 0.5 * u_canvasWidth;
    p1.y = (p1.y + 1.0) * 0.5 * u_canvasHeight;

    highp vec2 z = vec2(p1.y - p0.y, p0.x - p1.x);
    highp float zMag = sqrt(dot(z, z));
 
    // Compute scale s.t. the distance we compute in the fragment shader gives the distance between a point and the line as a fraction of the line's half width
    highp float s = 1.0 / (zMag * u_halfWidth);

    // Compute the values we'll need in the fragment shader to efficiently calculate the distance between a point and the line from p0 to c1 (one edge of the wide line)
    // If we express the line in the form ax + by + c = 0, then v_e0 = (a, b, c)*s
    // Note: this differs from and is more efficient than the "canonical" prefiltered line implementation presented in http://people.csail.mit.edu/ericchan/articles/prefilter/
    v_line = s * vec3(p0.y - p1.y, p1.x - p0.x, p0.x * p1.y - p0.y * p1.x);
}
