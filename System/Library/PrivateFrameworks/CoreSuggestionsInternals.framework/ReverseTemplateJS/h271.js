// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(t,e,n){if(!t||!e||!n)return CONTINUE;var a=Scanner.fromMessage(t);a.setLocale(e);var r,o,s,g,x,i,m,p,u,c;return r=a.getSpan().nextText(n.person).nextTag("td4").tagContents().trim(),c=a.getSpan().nextText(n.number).nextTag("td4").tagContents().trim(),o=a.getSpan().nextText(n.restaurant).nextTag("td4").tagContents().trim(),x=a.getSpan().nextText(n.restaurant).nextPhoneNumber(),i=a.getSpan().nextText(n.restaurant).nextAddress(),s=a.getSpan().nextText(n.date).nextDate(),g=a.getSpan().nextText(n.underName).nextTag("td4").tagContents().trim(),m=a.getSpan().nextText(n.cancel).nextLink(),ASSERT(r,o,s,g)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:r,reservationId:c,reservationStatus:"http://schema.org/ReservationConfirmed",reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:o,url:u,telephone:x,address:i},startTime:s,bookingAgent:{"@type":"http://schema.org/Organization",name:"Square Meal",url:"http://www.squaremeal.co.uk/"},underName:{"@type":"http://schema.org/Person",name:g},cancelReservationUrl:m,modifyReservationUrl:p}]:CONTINUE}}).call();