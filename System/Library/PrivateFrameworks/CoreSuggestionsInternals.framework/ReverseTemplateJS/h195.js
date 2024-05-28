// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,o,g,s,p,c,u,C,m,h,l,x,d,S,R,f,E;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;if(n.emailTitelCancelConfirmation.test(e.subject))return STOP;if(n.emailTitelConfirmation.test(e.subject)){s=a.getSpan().nextRegExp(n.reservationId).tagContents().innerCapture(n.reservationId,1),r=a.getSpan().nextRegExp(n.guestName).tagContents().innerCapture(n.guestName,1),u=a.getSpan().nextRegExp(n.checkInDate).tagContents().innerCapture(n.checkInDate,1),h=a.getSpan().nextRegExp(n.checkOutDate).tagContents().innerCapture(n.checkOutDate,1),c=a.getSpan().nextRegExp(n.checkInTime).tagContents().innerCapture(n.checkInTime,1),m=a.getSpan().nextRegExp(n.checkOutTime).tagContents().innerCapture(n.checkOutTime,1),C=getFuzzyDate(a.getDetachedSpan(u+" "+c).innerDate()),l=getFuzzyDate(a.getDetachedSpan(h+" "+m).innerDate());var T=a.getSpan().nextRegExp(n.price).tagContents().innerCapture(n.price,1);if(o=T.innerCapture(/([\d,.]+)/,1),g=T.innerCapture(/([^\d,.]+)/,1).trim(),R=a.getSpan().nextRegExp(n.hotelAddress).tagContents().innerCapture(n.hotelAddress,1).trim(),S=a.getSpan().nextRegExp(n.hotelPhone).tagContents().innerCapture(n.hotelPhone,1),d=a.getSpan().nextRegExp(n.hotelName).tagContents().innerCapture(n.hotelName,1),x=a.getSpan().nextRegExp(n.hotelUrl).tagContents().innerLink(),!ASSERT(r,s,C,l,R))return CONTINUE;p="Confirmed"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:o,priceCurrency:g,checkinTime:C,checkoutTime:l,modifyReservationUrl:f,cancelReservationUrl:E,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:d,url:x,telephone:S,address:R}}]}}).call();