// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,o,s,g,c,p,d,l,x,m,C,T,u,h,v,S,f;if(!(n.emailTitelConfirmation.test(e.subject)||n.emailTitelCancelConfirmation.test(e.subject)||n.emailTitelModifyConfirmation.test(e.subject)))return CONTINUE;var y=a.getSpan().nextText(n.hotelInfo).nextTag("table1").tagContents();return u=y.innerCapture(/(.+)\n/,1),h=y.innerPhoneNumber(),v=y.innerAddress(),y=(""+y).replace(""+u+"\n",""),y=(""+y).replace(""+h,""),v=y,g=a.getSpan().nextRegExp(n.reservationId).tagContents().innerCapture(n.reservationId,1),r=a.getSpan().nextText(n.guestName).nextTag("td1").tagContents(),d=a.getSpan().nextText(n.arrivalDate).nextTag("td1").tagContents().innerDate(),m=a.getSpan().nextText(n.departureDate).nextTag("td1").tagContents().innerDate(),p=a.getSpan().nextText(n.checkInPolicy).nextTag("td1").tagContents().innerDate(),x=a.getSpan().nextText(n.checkOutPolicy).nextTag("td1").tagContents(),""+x===n.noon?x="T12:00:00":C=x.innerDate(),l=combineDateAndTime(d,p),C=combineDateAndTime(m,x),o=a.getSpan().nextText(n.price).nextTag("td1").tagContents().innerCapture(/([\d,.]+)/,1),s=a.getSpan().nextText(n.price).nextTag("td1").tagContents().innerCapture(/([^\d,.]+)/,1).trim(),f=S=a.getSpan().nextText(n.modifyUrl).nextTag("td1").tagContents().innerLink(),c="Confirmed",n.emailTitelCancelConfirmation.test(e.subject)&&(g=a.getSpan().nextRegExp(n.reservationIdCancel).tagContents().innerCapture(n.reservationIdCancel,1),c="Cancelled"),ASSERT(l,C,v)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:o,priceCurrency:s,checkinTime:l,checkoutTime:C,modifyReservationUrl:S,cancelReservationUrl:f,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),reservationId:g,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:u,url:T,telephone:h,address:v}}]:void 0}}).call();