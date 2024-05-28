// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t){if(/reservas\@restaurantes\.com/.test(t.from)&&""===e.startTime){var a=Scanner.fromMessage(t);a.setLocale("es_ES");var r=a.getSpan().allDates();e.startTime=combineDateAndTime(r[0],r[1])}return e}}).call();
