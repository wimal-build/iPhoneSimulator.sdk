/*
 *  RCWaveformVertexShader.glsl
 *  VoiceMemos
 *
 *  Created by Charles Magahern on 3/27/13.
 *  Copyright (c) 2013 Charles Magahern. All rights reserved.
 */

attribute highp vec4 position;
uniform highp mat4 projection;
uniform highp mat4 modelview;

varying highp float timelinePosition;

void main()
{
    timelinePosition = position.x;
    gl_Position = projection * (modelview * position);
}
