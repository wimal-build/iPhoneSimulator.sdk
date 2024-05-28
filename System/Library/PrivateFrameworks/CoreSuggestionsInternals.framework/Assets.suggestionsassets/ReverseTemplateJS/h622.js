// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t){var a,r;for(r=0;e.seat.length>r&&(!a||!a.exists());r++)a=t.getSpan().innerCapture(e.seat[r],1);var l=loadHelper("tableextractor.js");for(r=0;e.tableLabelSeat.length>r&&(!a||!a.exists());r++)a=l(e.tableLabelSeat[r],t);return a}}).call();
