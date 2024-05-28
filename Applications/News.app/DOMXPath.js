//
//  DOMXPath.js
//
//  Copyright (c) 2014 Apple. All rights reserved.
//

function generateXPath(element) {
    var theElement = element;
    var pathSegments = []
    while (theElement.parentElement) {
        var parentElement = theElement.parentElement;
        var positionInParent = 1
        if (parentElement.childNodes) {
            var parentsChildren = parentElement.childNodes
            for (var i = 0; i < parentsChildren.length; i+=1.0) {
                if (theElement.nodeName === parentsChildren[i].nodeName) {
                    // increment everytime we see an element with the same node name
                    positionInParent+= 1;
                }
                if (theElement === parentsChildren[i]) {
                    positionInParent-=1
                    break;
                }
            }
        }
        
        if (positionInParent == 0) {
            positionInParent == 1
        }
        pathSegments.push("/"+theElement.tagName.toLowerCase()+"[" + positionInParent + "]");
        theElement = parentElement
    }
    // reverse the stack of path segments
    pathSegments = pathSegments.reverse()
    var path = "//html[1]" + pathSegments.join("")
    return path;
}