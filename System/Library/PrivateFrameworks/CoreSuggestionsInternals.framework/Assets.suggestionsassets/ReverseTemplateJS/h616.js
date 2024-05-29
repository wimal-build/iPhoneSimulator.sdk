// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t){var a,r;for(r=0;e.seatRow.length>r&&(!a||!a.exists());r++)a=t.getSpan().innerCapture(e.seatRow[r],1);var l=loadHelper("tableextractor.js");for(r=0;e.tableLabelRow.length>r&&(!a||!a.exists());r++)a=l(e.tableLabelRow[r],t);return a}}).call();
