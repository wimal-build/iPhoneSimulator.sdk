// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var r=Scanner.fromMessage(e);r.setLocale(t);var a,p,o,i,s,c,g,d,m,u,x,l,h,S,f,C,v,R,y,E,T,k="Rentalcars.com";if("1"===n.version&&(a=r.getSpan().innerCapture(n.guestName,1),u=r.getSpan().innerCapture(n.brand,1),T=r.getSpan().innerCapture(n.price,1),d=T.innerCapture(/([\d,.]+)/,1),m=T.innerCapture(/([^\d,.]+)/,1),c=g=r.getSpan().nextRegExp(n.modifyUrl).nextLink(),v=h=r.getSpan().innerCapture(n.supplier,1),r.getSpan().nextText(n.voucher).exists()||r.getSpan().nextText(n.change).exists()?(E=r.getSpan().nextText(n.pickupDetails).nextDate(),R=E.previousRegExp(/\1:(.*)/,n.address),R=E.previousRegExp(regExpFormatted(/\1:\s+.*/,n.address)).innerCapture(regExpFormatted(/\1:\s+(.*)/,n.address),1),C=r.getSpan().nextText(n.dropoffDetails).nextDate(),S=C.previousRegExp(regExpFormatted(/\1:\s+.*/,n.address)).innerCapture(regExpFormatted(/\1:\s+(.*)/,n.address),1)):(o=r.getSpan().innerCapture(n.reservationId,1),o.exists()||(o=e.subject.match(n.reservationId2)[1]),E=r.getSpan().nextText(n.pickupTime).nextDate(),C=r.getSpan().nextText(n.dropoffTime).nextDate(),R=r.getSpan().innerCapture(n.pickup,1),S=r.getSpan().innerCapture(n.dropoff,1))),"2"===n.version&&(a=r.getSpan().innerCapture(n.guestName,1),o=e.subject.match(n.reservationId)[1],u=r.getSpan().innerCapture(n.brand,1),E=r.getSpan().nextRegExp(n.pickup).nextDate(),R=r.getSpan().nextRegExp(n.location).innerCapture(n.location,1),C=r.getSpan().nextRegExp(n.dropoff).nextDate(),S=r.getSpan().nextRegExp(n.location).nextRegExp(n.location).innerCapture(n.location,1),T=r.getSpan().innerCapture(n.price,1),d=T.innerCapture(/([\d,.]+)/,1),m=T.innerCapture(/([^\d,.]+)/,1),c=g=r.getSpan().nextText(n.modifyUrl).nextLink()),n.cancellationSubject.test(e.subject)){if(i="Cancelled",!ASSERT(o,a))return CONTINUE}else if(i="Confirmed",!ASSERT(a,E,C,R,S))return CONTINUE;return 0===(""+u).length?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:d,priceCurrency:m,reservationId:o,reservationStatus:"http://schema.org/Reservation"+i,checkinUrl:s,modifyReservationUrl:c,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:a,email:p},provider:{"@type":"http://schema.org/Organization",name:k},pickupTime:E,pickupLocation:{"@type":"http://schema.org/Place",name:v,telephone:y,address:R},dropoffTime:C,dropoffLocation:{"@type":"http://schema.org/Place",name:h,telephone:f,address:S}}]:[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:d,priceCurrency:m,reservationId:o,reservationStatus:"http://schema.org/Reservation"+i,checkinUrl:s,modifyReservationUrl:c,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:a,email:p},provider:{"@type":"http://schema.org/Organization",name:k},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:u},license:x,color:l},pickupTime:E,pickupLocation:{"@type":"http://schema.org/Place",name:v,telephone:y,address:R},dropoffTime:C,dropoffLocation:{"@type":"http://schema.org/Place",name:h,telephone:f,address:S}}]}}).call();