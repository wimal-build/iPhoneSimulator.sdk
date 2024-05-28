/*
 * Copyright (C) 2010 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {

    // Convert some mouse handlers to touch handlers. This makes tapping
    // on the inspector much more responsive.
    if (document.createTouch) {

        // Intercept addEventListener to change event types.
        var originalAddEventListener = Element.prototype.addEventListener;
        Element.prototype.addEventListener = function() {
            var eventType = arguments[0];

            // Ignore mouse move events.
            if (eventType === "mousemove" ||
                eventType === "mouseover" ||
                eventType === "mouseout")
                return;

            // Convert basic "click" listeners to "touchstart" listeners.
            if (eventType === "click")
                arguments[0] = "touchstart";

            originalAddEventListener.apply(this, arguments);
        }

        // TreeElement click listeners rely on specific click event information.
        // Changing it to a touch event requires us to make our touch events
        // look more like a click event.
        var originalTreeElementToggled = TreeElement.treeElementToggled;
        TreeElement.treeElementToggled = function(event) {
            var fakeClickEvent = event.touches[0];
            fakeClickEvent.currentTarget = event.target;
            originalTreeElementToggled.call(this, fakeClickEvent);
        }

    }

    // Apply styles that won't apply via CSS alone.
    window.addEventListener("load", function() {
        var toolbar = document.getElementById("toolbar");
        toolbar.style.backgroundImage = '-webkit-gradient(linear, left top, left bottom, from(rgb(191, 191, 191)), to(rgb(151, 151, 151))) !important';
    }, false);

})();
