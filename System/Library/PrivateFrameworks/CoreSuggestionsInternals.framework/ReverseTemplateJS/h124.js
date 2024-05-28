// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){function r(e){return e=e.replace(/[^\d\sa-zA-z:]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(a.getDetachedSpan(e))}var a=Scanner.fromMessage(e);a.setLocale(t);var i,o,c,s,u,p,m,l,g,C,h,d,f,S;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;u=a.getSpan().innerCapture(n.reservationId,1),i=a.getSpan().innerCapture(n.guestName,1);var v=a.getSpan().innerCapture(n.price,1);if(c=v.innerCapture(/([\d,.]+)/,1),m=""+a.getSpan().innerCapture(n.checkInDate,1),m=r(m),l=""+a.getSpan().innerCapture(n.checkOutDate,1),l=r(l),C=a.getSpan().innerCapture(n.hotelName,1),h=a.getSpan().nextPhoneNumber().nextPhoneNumber(),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(i,u,m,C))return CONTINUE;p="Confirmed"}if(n.emailTitelCancelConfirmation.test(e.subject)){if(!ASSERT(i,u,m,C))return CONTINUE;p="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:i,email:o},totalPrice:c,priceCurrency:s,checkinTime:m,checkoutTime:l,modifyReservationUrl:f,cancelReservationUrl:S,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:u,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:C,url:g,telephone:h,address:d}}]}}).call();