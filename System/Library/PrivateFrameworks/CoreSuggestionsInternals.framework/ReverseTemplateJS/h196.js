// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,o,g,s,p,c,m,u,x,d,C,h,l;if(!n.emailTitelConfirmation.test(e.subject))return CONTINUE;if(n.emailTitelConfirmation.test(e.subject)){s=a.getSpan().nextRegExp(n.reservationId).tagContents().innerCapture(n.reservationId,1),r=a.getSpan().nextRegExp(n.guestName).nextAnyTag("td").tagContents().innerCapture(/(.+)\,/,1),c=a.getSpan().nextRegExp(n.checkInDate).nextAnyTag("td").tagContents().innerDate(),m=a.getSpan().nextRegExp(n.checkOutDate).nextAnyTag("td").tagContents().innerDate(),x=a.getSpan().nextRegExp(n.hotelName).nextAnyTag("td").tagContents();var f=a.getSpan().nextRegExp(n.price).nextAnyTag("td").tagContents();if(o=f.innerCapture(/([\d,.]+)/,1),g=f.innerCapture(/([^\d,.]+)/,1).trim(),h=l=a.getSpan().nextRegExp(n.modifyUrl).tagContents().innerLink(),!ASSERT(r,s,c,m,C||x))return CONTINUE;p="Confirmed"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:o,priceCurrency:g,checkinTime:c,checkoutTime:m,modifyReservationUrl:h,cancelReservationUrl:l,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:x,url:u,telephone:d,address:C}}]}}).call();