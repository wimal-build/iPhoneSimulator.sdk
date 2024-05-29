// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(n,t){for(var a=t.getSpan().next(n).parentAnyTag("td"),e=a.innerCapture(/\[td(\d+)\]/,1),r=a.parentAnyTag("tr").allInnerTags("td"+e),g=0,l=0;r.length>l;l++)if(r[l].sameAs(a)){g=l;break}var s=a.nextAnyTag("tr").allInnerTags("td"+e)[g];return s&&s.exists()?s.tagContents():void 0}}).call();
