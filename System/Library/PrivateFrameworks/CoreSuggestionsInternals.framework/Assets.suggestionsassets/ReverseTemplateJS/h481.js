// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){function a(e){return e=e.replace(/[^\d\sa-zA-z:]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(r.getDetachedSpan(e))}var r=Scanner.fromMessage(e);r.setLocale(t);var g,o,i,s,p,c,d,l,x,m,u,C,h,T;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject))return CONTINUE;p=r.getSpan().nextRegExp(n.reservationId).nextAnyTag("td").tagContents(),g=r.getSpan().nextRegExp(n.guestName).nextAnyTag("td").tagContents();var y=r.getSpan().nextRegExp(n.price).nextAnyTag("td").tagContents();if(i=y.innerCapture(/([\d,.]+)/,1),s=y.innerCapture(/([^\d,.]+)/,1),d=""+r.getSpan().nextRegExp(n.checkInDate).nextAnyTag("td").tagContents(),d=a(d),l=""+r.getSpan().nextRegExp(n.checkOutDate).nextAnyTag("td").tagContents(),l=a(l),m=r.getSpan().nextRegExp(n.hotelName).nextAnyTag("td").tagContents().innerCapture(regExpFormatted(/(.+)\s<http/),1),x=r.getSpan().nextRegExp(n.hotelName).nextAnyTag("td").tagContents().innerLink(),C=r.getSpan().nextRegExp(n.hotelAddress).nextAnyTag("td").tagContents(),u=r.getSpan().nextRegExp(n.hotelPhone).nextAnyTag("td").tagContents(),n.emailTitelConfirmation.test(e.subject)){if(!ASSERT(g,p,d,l,m))return CONTINUE;c="Confirmed"}return n.emailTitelCancelConfirmation.test(e.subject)&&(c="Cancelled"),[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:g,email:o},totalPrice:i,priceCurrency:s,checkinTime:d,checkoutTime:l,modifyReservationUrl:h,cancelReservationUrl:T,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:m,url:x,telephone:u,address:C}}]}}).call();
