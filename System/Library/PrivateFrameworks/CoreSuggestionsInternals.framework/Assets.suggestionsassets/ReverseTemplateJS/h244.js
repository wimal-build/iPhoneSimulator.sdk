// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return{getSeatMap:function(t){t=(""+t).split("\n");for(var n={},r=0;t.length>r;r++){var e=t[r].split(":").map(function(t){return t.trim()});2==e.length&&(n[e[0]]="---"===e[1]?"":e[1])}return n}}}).call();
