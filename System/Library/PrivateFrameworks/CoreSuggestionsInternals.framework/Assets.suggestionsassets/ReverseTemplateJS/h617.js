// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t){var n,a;for(a=0;e.seatSection.length>a&&(!n||!n.exists());a++)n=t.getSpan().innerCapture(e.seatSection[a],1);var r=loadHelper("tableextractor.js");for(a=0;e.tableLabelSection.length>a&&(!n||!n.exists());a++)n=r(e.tableLabelSection[a],t);return n&&n.exists()&&(n=n.trim()),n}}).call();
