//  TSDDepthShader.vert
//  TSDrawables
//
//  Created by Jennifer Chan on 9/19/12.

// the vertex shader for creating the depth map

attribute vec4 Position;

uniform mat4 ProjMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ModelMatrix;

varying vec4 vPosition;

void main()
{
    vPosition = ViewMatrix*ModelMatrix*Position;
    gl_Position = ProjMatrix*vPosition;
}