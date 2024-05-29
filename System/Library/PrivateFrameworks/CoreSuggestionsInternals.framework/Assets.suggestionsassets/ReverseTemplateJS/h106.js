// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){function a(e){return e=e.replace(/[^\d\sa-zA-z:\u6642\u5206]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(n.getDetachedSpan(e))}var n=Scanner.fromMessage(e);n.setLocale(t);var p,o,i,c,s,m,h,u,l,g,d,f,C,v,y,S,R,T,k,P,U;p=n.getSpan().innerCapture(r.guestName,1),i=n.getSpan().innerCapture(r.reservationId,1),g=n.getSpan().innerCapture(r.car,1),U=n.getSpan().innerCapture(r.dates),P=a(""+U.$pickupTime),S=a(""+U.$dropoffTime);var z=n.getSpan().innerCapture(r.pickup,1);T=""+z.innerCapture(/(.+)\uff08/,1),k=""+z.innerCapture(/TEL\uff1a(.+)/,1);var E=n.getSpan().innerCapture(r.dropoff,1);v=""+E.innerCapture(/(.+)\uff08/,1),y=""+E.innerCapture(/TEL\uff1a(.+)/,1);var L=n.getSpan().nextRegExp(r.price).tagContents().innerCapture(r.price,1);if(u=L.innerCapture(/([\d,.]+)/,1),l=L.innerCapture(/([^\d,.]+)\uff08/,1).trim(),r.confirmSubject.test(e.subject)&&!ASSERT(p,i,P,S,T))return CONTINUE;if(r.cancellationSubject.test(e.subject)){if(!ASSERT(p,i,P,S,T))return CONTINUE;c="Cancelled"}return 0===(""+g).length||null===g?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:u,priceCurrency:l,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),checkinUrl:s,modifyReservationUrl:m,cancelReservationUrl:h,underName:{"@type":"http://schema.org/Person",name:p,email:o},provider:{"@type":"http://schema.org/Organization",name:"Orix"},pickupTime:P,pickupLocation:{"@type":"http://schema.org/Place",name:R,telephone:k,address:T},dropoffTime:S,dropoffLocation:{"@type":"http://schema.org/Place",name:C,telephone:y,address:v}}]:[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:u,priceCurrency:l,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),checkinUrl:s,modifyReservationUrl:m,cancelReservationUrl:h,underName:{"@type":"http://schema.org/Person",name:p,email:o},provider:{"@type":"http://schema.org/Organization",name:"Orix"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:g},license:d,color:f},pickupTime:P,pickupLocation:{"@type":"http://schema.org/Place",name:R,telephone:k,address:T},dropoffTime:S,dropoffLocation:{"@type":"http://schema.org/Place",name:C,telephone:y,address:v}}]}}).call();
