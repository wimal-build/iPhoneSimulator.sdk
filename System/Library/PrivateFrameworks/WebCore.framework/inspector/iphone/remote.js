/*
 * Copyright (C) 2011 Apple Inc. All Rights Reserved.
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

// Injected JavaScript before onload event fires.
(function() {

    function initializeGlobalWebInspectorSocketFunctions()
    {
        window.webInspectorSocketOnMessage = function(str) {
            var data = { data: str };
            window.WebInspectorSocket.onmessage(data);
        }

        window.WebInspectorSocket = {
            onmessage: function(){},
            onerror: function(){},
            onopen: function(){},
            send: function(str) { window.webInspectorSocket.fakeSend(str); },
        }
    }

    var _loaded = WebInspector.loaded;
    WebInspector.loaded = function()
    {
        // Initialize with a Fake WebSocket if injected object exists.
        if (window.webInspectorSocket) {
            initializeGlobalWebInspectorSocketFunctions();
            WebInspector.socket = window.WebInspectorSocket;
            WebInspector.socket.onmessage = function(message) { InspectorBackend.dispatch(message.data); }
            WebInspector.socket.onerror = function(error) { console.error(error); }

            // Immediately run "onopen" handling.
            InspectorFrontendHost.sendMessageToBackend = WebInspector.socket.send.bind(WebInspector.socket);
            InspectorFrontendHost.loaded = WebInspector.socket.send.bind(WebInspector.socket, "loaded");
            WebInspector.doLoadedDone();
            return;
        }

        _loaded();
    }

})();
