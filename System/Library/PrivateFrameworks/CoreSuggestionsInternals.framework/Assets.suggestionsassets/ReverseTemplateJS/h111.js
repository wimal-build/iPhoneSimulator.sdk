// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,a){var r=Scanner.fromMessage(e);r.setLocale(t);var n,o,p,i,c=r.getSpan(),s="Sixt",m="Cancelled";return n=c.innerCapture(a.underPersonNameRegex,1),o=r.getDetachedSpan(e.subject).innerCapture(a.reservationIdRegex,1),i=c.firstDate(),p=c.innerCapture(a.pickUpNameRegex,1),ASSERT(o,p,i)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationStatus:"http://schema.org/Reservation"+m,reservationId:o,underName:{"@type":"http://schema.org/Person",name:n},provider:{"@type":"http://schema.org/Organization",name:s},pickupTime:i,pickupLocation:{"@type":"http://schema.org/Place",name:p}}]:void 0}}).call();
