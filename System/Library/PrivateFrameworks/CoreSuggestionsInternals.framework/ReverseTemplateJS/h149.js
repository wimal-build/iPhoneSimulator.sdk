// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var r=Scanner.fromMessage(e);r.setLocale(t);var a,i,o,s,c,p,u,g,l,C,m,h,d,f;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;a=r.getSpan().nextAnyTag("table").tagContents().innerCapture(/(.+)/,1),c=r.getSpan().innerCapture(n.reservationId,1);var T=r.getSpan().nextRegExp(n.hotelInfo).nextTag("table4").tagContents().firstDate();u=getFuzzyDate(r.getDetachedSpan(""+T.innerCapture(/(.+) au (.+)/,1))),g=getFuzzyDate(r.getDetachedSpan(""+T.innerCapture(/(.+) au (.+)/,2)));var v=r.getSpan().nextRegExp(n.price).tagContents().innerCapture(n.price,1);o=v.innerCapture(/([\d,.]+)/,1),s=v.innerCapture(/([^\d,.]+)/,1).trim();var S=r.getSpan().nextRegExp(n.hotelInfo).nextAnyTag("td").tagContents();if(C=S.innerCapture(/(.+)/,1),h=S.innerCapture(n.hotelAddress,1),m=S.nextPhoneNumber(),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(a,c,u,g,h))return CONTINUE;p="Confirmed"}if(n.emailTitelCancelConfirmation.test(e.subject)){if(!ASSERT(a,c,u,g,h))return CONTINUE;p="Cancelled"}return[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:a,email:i},totalPrice:o,priceCurrency:s,checkinTime:u,checkoutTime:g,modifyReservationUrl:d,cancelReservationUrl:f,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),reservationId:c,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:C,url:l,telephone:m,address:h}}]}}).call();