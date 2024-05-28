// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){function n(e){return e=e.replace(/[^\d\sa-zA-z:\u6642\u5206]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/"),e=getFuzzyDate(a.getDetachedSpan(e))}var a=Scanner.fromMessage(e);a.setLocale(t);var p,o,i,c,s,m,u,h,g,l,d,f,C,S,v,y,R,k,P,N,T="Toyota";i=a.getSpan().innerCapture(r.reservationId,1),p=a.getSpan().innerCapture(r.guestName,1),o=a.getSpan().innerCapture(r.guestEmail,1),R=""+a.getSpan().innerCapture(r.pickupNameAndPhone,1),P=""+a.getSpan().innerCapture(r.pickupNameAndPhone,2),(0===(""+R).length||null===R)&&(R=""+a.getSpan().innerCapture(r.pickupName,1)),N=""+a.getSpan().innerCapture(r.pickupTime,1),N=n(N),C=""+a.getSpan().innerCapture(r.dropoffName,1),y=""+a.getSpan().innerCapture(r.dropoffTime,1),y=n(y),l=""+a.getSpan().innerCapture(r.car,1);var b=a.getSpan().innerCapture(r.price,1);if(0===(""+b).length||null===b)var b=a.getSpan().innerCapture(r.priceAlt,1);if(h=b.innerCapture(/([\d,.]+)/,1),g=b.innerCapture(/([^\d,.]+)/,1).trim(),0===p.toString.length&&r.reminderSubject.test(e.subject)&&(p=a.getSpan().innerCapture(/(.+)/,1)),r.confirmSubject.test(e.subject)&&(c="Confirmed"),r.cancellationSubject.test(e.subject)){if(!ASSERT(p,i,N,y,k||R,S||C))return CONTINUE;c="Cancelled"}return(""+l).length>0?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:h,priceCurrency:g,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),checkinUrl:s,modifyReservationUrl:m,cancelReservationUrl:u,underName:{"@type":"http://schema.org/Person",name:p,email:o},provider:{"@type":"http://schema.org/Organization",name:T},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:l},license:d,color:f},pickupTime:N,pickupLocation:{"@type":"http://schema.org/Place",name:R,telephone:P,address:k},dropoffTime:y,dropoffLocation:{"@type":"http://schema.org/Place",name:C,telephone:v,address:S}}]:[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:h,priceCurrency:g,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(c||"Confirmed"),checkinUrl:s,modifyReservationUrl:m,cancelReservationUrl:u,underName:{"@type":"http://schema.org/Person",name:p,email:o},provider:{"@type":"http://schema.org/Organization",name:T},pickupTime:N,pickupLocation:{"@type":"http://schema.org/Place",name:R,telephone:P,address:k},dropoffTime:y,dropoffLocation:{"@type":"http://schema.org/Place",name:C,telephone:v,address:S}}]}}).call();