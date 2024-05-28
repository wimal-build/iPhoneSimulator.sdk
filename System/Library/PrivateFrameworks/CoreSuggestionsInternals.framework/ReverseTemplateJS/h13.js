// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,p,i,o,g,c,s,u,d,l,C,x,S,m,T,f,h,v,y,k;if(n.confirm.test(e.subject))if(a.getSpan().nextText(n.plaintext).exists()){i=a.getSpan().innerCapture(n.plainreservationId,1),r=a.getSpan().innerCapture(n.plainguestName,1),k=getFuzzyDate(a.getDetachedSpan(""+a.getSpan().innerCapture(n.plaindates,1))),f=getFuzzyDate(a.getDetachedSpan(""+a.getSpan().innerCapture(n.plaindates,2))),v=a.getSpan().innerCapture(n.plainpickUp,1),y=a.getSpan().innerCapture(n.plainpickUp,2),m=a.getSpan().innerCapture(n.plaindropOff,1),T=a.getSpan().innerCapture(n.plaindropOff,2),l=a.getSpan().innerCapture(n.plaincar,1);var P=a.getSpan().innerCapture(n.plainprice,1);u=P.innerCapture(/([\d,.]+)/,1),d=P.innerCapture(/([^\d,.]+)/,1)}else i=a.getSpan().innerCapture(n.reservationId,1),r=a.getSpan().nextText(n.guestName).nextTag("td5").tagContents(),v=a.getSpan().nextText(n.pickUp).nextTag("td5").tagContents().innerCapture(/(.+)/,1),y=a.getSpan().nextText(n.pickUp).nextTag("td5").tagContents().innerPhoneNumber(),k=a.getSpan().nextText(n.pickUpTime).nextTag("td5").tagContents().innerDate(),m=a.getSpan().nextText(n.dropOff).nextTag("td5").tagContents().innerCapture(/(.+)/,1),T=a.getSpan().nextText(n.dropOff).nextTag("td5").tagContents().innerPhoneNumber(),f=a.getSpan().nextText(n.dropOffTime).nextTag("td5").tagContents().innerDate(),l=a.getSpan().nextText(n.car).nextTag("td5").tagContents(),u=a.getSpan().nextText(n.totalPrice).nextTag("td5").tagContents().innerCapture(/([\d,.]+)/,1),d=a.getSpan().nextText(n.totalPrice).nextTag("td5").tagContents().innerCapture(/([^\d,.]+)/,1).trim();else{if(!n.cancel.test(e.subject))return CONTINUE;o="Cancelled",i=a.getSpan().innerCapture(n.cancelId,1),r=a.getSpan().innerCapture(n.cancelguestName,1),v=a.getSpan().innerCapture(n.cancelPickupLoc,1),m=a.getSpan().innerCapture(n.cancelDropoffLoc,1),k=a.getSpan().innerCapture(n.cancelPickupTime,1),f=a.getSpan().innerCapture(n.cancelDropoffTime,1),l=a.getSpan().innerCapture(n.carCancel,1)}return ASSERT(i,r,l,v,k)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:u,priceCurrency:d,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(o||"Confirmed"),checkinUrl:g,modifyReservationUrl:c,cancelReservationUrl:s,underName:{"@type":"http://schema.org/Person",name:r,email:p},provider:{"@type":"http://schema.org/Organization",name:"Budget"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:l},license:C,color:x},pickupTime:k,pickupLocation:{"@type":"http://schema.org/Place",name:h,telephone:y,address:v},dropoffTime:f,dropoffLocation:{"@type":"http://schema.org/Place",name:S,telephone:T,address:m}}]:void 0}}).call();