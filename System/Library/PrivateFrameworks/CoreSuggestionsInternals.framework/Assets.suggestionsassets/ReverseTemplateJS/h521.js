// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){if(!e||!t||!r)return CONTINUE;var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,o,s,p,g,m,c,h,u,d={"@type":"http://schema.org/Organization",name:"2spaghi",url:"www.2spaghi.it"};u=a.getSpan().innerCapture(regExpFormatted(/\b\1 (.*)\n/,r.underNamePrefix),1);var x=""+a.getSpan().innerCapture(regExpFormatted(/\b\1 (.*)\n/,r.reservationStartDatePrefix),1),S=""+a.getSpan().innerCapture(regExpFormatted(/\b\1 (.*)\n/,r.reservationStartTimePrefix),1);return g=x+" "+S,g=getFuzzyDate(a.getDetachedSpan(g).firstDate()),h=a.getSpan().innerCapture(regExpFormatted(/\b\1 (.*)\n/,r.partySizePrefix),1),n=a.getSpan().innerCapture(regExpFormatted(/\b\1\n\n(.*)\n/,r.restaurantNamePrefix),1),e.subject.indexOf(r.confirmationSubject)>-1?(m="http://schema.org/ReservationConfirmed",c=a.getSpan().nextText(r.cancelReservationUrlPrefix).nextLink()):m="http://schema.org/ReservationCancelled",ASSERT(h,n,g,u)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:h,reservationId:p,reservationStatus:m,reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:n,url:s,telephone:o,address:i},startTime:g,bookingAgent:d,underName:{"@type":"http://schema.org/Person",name:u},cancelReservationUrl:c}]:void 0}}).call();
