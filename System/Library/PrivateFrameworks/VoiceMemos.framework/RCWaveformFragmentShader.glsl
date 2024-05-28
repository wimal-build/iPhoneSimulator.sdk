/*
 *  RCWaveformFragmentShader.glsl
 *  VoiceMemos
 *
 *  Created by Charles Magahern on 3/27/13.
 *  Copyright (c) 2013 Charles Magahern. All rights reserved.
 */

uniform highp vec4 foregroundColor;
uniform highp vec4 highlightColor;
uniform highp vec2 highlightColorTimelineRange;

varying highp float timelinePosition;

void main()
{
    gl_FragColor = foregroundColor;
    
    if (timelinePosition >= highlightColorTimelineRange[0] && timelinePosition <= highlightColorTimelineRange[1]) {
        gl_FragColor = highlightColor;
    }
}
