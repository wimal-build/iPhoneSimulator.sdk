// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,a){var n=Scanner.fromMessage(e);n.setLocale(t);var r,o,i,p,c,m,s=n.getSpan(),u="Modified";o=s.innerCapture(a.reservationId,1),r=s.innerCapture(a.name,1);var h=s.next(a.pickup);p=h.next(a.datetime).nextDate(),i=h.next(a.locationName).innerCapture(a.locationName,1);var d=s.next(a.dropoff);return m=d.next(a.datetime).nextDate(),c=d.next(a.locationName).innerCapture(a.locationName,1),ASSERT(o,i,p)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationStatus:"http://schema.org/Reservation"+u,reservationId:o,underName:{"@type":"http://schema.org/Person",name:r},provider:{"@type":"http://schema.org/Organization",name:"Auto Europe"},pickupTime:p,pickupLocation:{"@type":"http://schema.org/Place",name:i},dropoffTime:m,dropoffLocation:{"@type":"http://schema.org/Place",name:c}}]:void 0}}).call();
