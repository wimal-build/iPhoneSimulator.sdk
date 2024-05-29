// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(t){if(t.html){var r=t.html,e=parseMicrodata(r);if(e.length){for(var a=!1,n=0;e.length>n;n++)if("http://schema.org/FoodEstablishmentReservation"!==e[n]["@type"]){a=!0;break}if(!a)return e}}}}).call();
