
// taken/adapted from http://devmaster.net/posts/shader-effects-shadow-mapping

#ifdef GL_ES
precision mediump float;
#endif

uniform float ContactShadowFar;
uniform float ContactShadowNear;
uniform float ContactShadowWidth;       // this is the width of the framebuffer
uniform float ContactShadowRadius;
uniform float ContactShadowFalloff;     // goes from 0-10
uniform float ContactShadowAttenuation; // goes from 0.0-1.0
                                        // deals with our jitter/how wide we want our shadow to be
uniform vec4  ContactShadowColor;
uniform float ContactShadowOffset;

varying vec4 vPosition;


void main()
{
    /// linear depth calculation
    float linearDepthConstant = 1.0 /(ContactShadowFar-ContactShadowNear);
    
    // the v-position is negative since we've rotated it, so we've also essentially rotated our 'ground'
    float groundBias = 0.0; 
    float linearZDepth = abs((vPosition.z-ContactShadowNear+groundBias)*linearDepthConstant);
    linearZDepth = clamp(linearZDepth, 0.0,1.0);    
    float zResult = pow(linearZDepth,clamp(ContactShadowFalloff,.1,10.0)); // this is opposite of a shadow
    // 0 -> 1, far -> near, so near = 1, appears white

    // the center is at 0, so the shadowradius is actually 1/2 of that specified
    float linearYDepth = abs(vPosition.y*2.0/ContactShadowRadius);
    linearYDepth = clamp(linearYDepth,0.0,1.0);
    
    // depth in x-axis
    // bias the width based on the attenuation
    float widthBias = 1.0;
    if(ContactShadowAttenuation < 0.5)
    {
        // want the width bias to range from [.4,1.0]
        // attenuation ranges from [0,0.5]
        widthBias = ContactShadowAttenuation*1.2+0.4;
    } else {
        // attenuation ranges from [0.5,1]
        // want it to range from [1.0,1.2]
        widthBias = (ContactShadowAttenuation-0.5)*0.05+1.0;
    }
    float linearXDepth = abs(vPosition.x*2.0/(widthBias*(ContactShadowWidth-ContactShadowRadius*2.0)));
    linearXDepth = clamp(linearXDepth, 0.0, 1.0);
    
    float linearDepth = 1.0-zResult;
    float alpha = 0.6;
    
    // grey out the color based on the y distance
    linearDepth = 2.0*linearYDepth+linearDepth;
    
    // check within bounds of ellipse/squircle
    float ellipseVal = pow(linearXDepth,4.0)+pow(linearYDepth,4.0);
    if(ellipseVal <= 1.0) {
        // let's not attenuate by ellipse radius for now, because it makes text look bad
        // however, this does result in a more square/blocky result as the radius gets bigger
        //linearDepth = linearDepth+ (1.0- (pow(1.0-ellipseVal,2.0)));
    }
    else if(ellipseVal > 1.0) {
        linearDepth = 1.0;
        alpha = 0.0;
    }

    // we're touching the floor, harden the floor a little
    if (linearZDepth > .95 && linearYDepth < 0.05) {
        linearDepth = 0.0;
    }

    // if white, set alpha to 0
    if (linearDepth > 1.0) {                   
        alpha = 0.0;
    }
     
    // means we're floating, lighten it a bit
     float offsetBias = 0.0;
     if(ContactShadowOffset > 0.0) {
        offsetBias = ContactShadowOffset/100.0;
     }
    float grayClamp = 0.6;
    linearDepth = linearDepth*(grayClamp+offsetBias);
    float grayscale = clamp(linearDepth, 0.0, grayClamp);  // clamp it to a certain level of gray, we don't want white
    
    vec4 tintColor = ContactShadowColor;
    vec4 finalShadow = vec4(tintColor.rgb*(1.0-grayscale), alpha);
    
    // black is 0,0,0
    gl_FragColor = finalShadow; 

}