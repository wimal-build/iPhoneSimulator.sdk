// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){function r(e){return e=e.replace(/[^\d\sa-zA-z:]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(a.getDetachedSpan(e))}var a=Scanner.fromMessage(e);a.setLocale(t);var i,o,c,p,s,u,l,m,C,g,d,h,f,S;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;s=a.getSpan().innerCapture(n.reservationId,1),i=a.getSpan().innerCapture(n.guestName,1),l=""+a.getSpan().innerCapture(n.checkinDate,1),l=r(l);var v=a.getSpan().innerCapture(n.price,1);if(c=v.innerCapture(/([\d,.]+)/,1),p=v.innerCapture(/([^\d,.]+)/,1),S=f=""+a.getSpan().innerCapture(n.modifyUrl,1),g=a.getSpan().innerCapture(n.hotelName,1),d=a.getSpan().innerCapture(n.hotelPhone,1),C=""+a.getSpan().innerCapture(n.hotelUrl,1),n.emailTitelConfirmation.test(e.subject)&&(u="Confirmed"),n.emailTitelCancelConfirmation.test(e.subject)){var v=a.getSpan().innerCapture(n.cancelPrice,1);if(c=v.innerCapture(/([\d,.]+)/,1),p=v.innerCapture(/([^\d,.]+)/,1),!ASSERT(i,s,l,g))return CONTINUE;u="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:i,email:o},totalPrice:c,priceCurrency:p,checkinTime:l,checkoutTime:m,modifyReservationUrl:f,cancelReservationUrl:S,reservationStatus:"http://schema.org/Reservation"+(u||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:g,url:C,telephone:d,address:h}}]}}).call();