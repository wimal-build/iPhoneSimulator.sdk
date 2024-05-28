/*
 *  RCWaveformFragmentShader.glsl
 *  VoiceMemos
 *
 *  Created by Charles Magahern on 3/27/13.
 *  Copyright (c) 2013 Charles Magahern. All rights reserved.
 */

uniform highp vec4 foregroundColor;

void main()
{
    gl_FragColor = foregroundColor;
}