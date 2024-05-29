// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var r=function(e){return regExpFormatted(/\s+\1\s*\2(.+)/,e,n.colonType||": ")},a=Scanner.fromMessage(e);a.setLocale(t);var i,o,s,c,p,h,u,g,l,m,d,v,x,C=a.getSpan();return i=C.nextText(n.originalBookingDetails).withEnd(C.nextText(n.cancellationDetails).getStart()),p=i.innerCapture(r(n.firstName),1),h=i.innerCapture(r(n.lastName),1),c=i.innerCapture(r(n.reservationId),1),d=i.innerCapture(r(n.hotelName),1),g=i.innerCapture(r(n.checkInDate),1),l=i.innerCapture(r(n.checkOutDate),1),x=d,g.exists()&&(g=a.getDetachedSpan(""+g).innerDate()),l.exists()&&(l=a.getDetachedSpan(""+l).innerDate()),u=n.lastNameFirst?""+h+" "+p:""+p+" "+h,ASSERT(g,l,d)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:u},totalPrice:o,priceCurrency:s,checkinTime:g,checkoutTime:l,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:c,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:d,url:m,telephone:v,address:x}}]:void 0}}).call();
