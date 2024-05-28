// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(n,t){var e,a;for(a=0;n.reservationId.length>a&&(!e||!e.exists());a++)e=t.getSpan().innerCapture(n.reservationId[a],1);return e&&e!==t.getNullSpan()||(e=t.getSpan().next(n.altReservationId[0]).nextAnyTag("td").tagContents(),(""+e).match(/^\d+$/)||(e=e.lastInnerRegExp(/\d+$/))),e}}).call();
