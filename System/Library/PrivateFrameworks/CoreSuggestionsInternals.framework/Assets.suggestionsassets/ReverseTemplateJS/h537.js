// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e){for(var r=e.headers,o={},t=0;r.length>t;t++)"to"===r[t][0].toLowerCase()&&(o[r[t][1].toLowerCase()]=!0);for(var t=0;r.length>t;t++)if("reply-to"===r[t][0].toLowerCase()&&o[r[t][1].toLowerCase()])return!0;return!1}}).call();
