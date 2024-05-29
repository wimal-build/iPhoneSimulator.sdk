// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){if(!e||!t||!r)return CONTINUE;var a=Scanner.fromMessage(e);a.setLocale(t);var n,o,i,p,s,c,d,g,m,l,u,h,T,f,x=[],v=[],C=function(e){return p=e.nextTag("table7").nextTag("table7").nextTag("tr7").nextTag("td7"),s=p.nextTag("td7").tagContents().innerCapture(regExpFormatted(/\1:\s+(.*)/,r.car.name),1),f=p.nextText(r.car.driver).nextTag("td7").tagContents().innerCapture(/(.*):/,1),p=p.tagContents().innerCapture(regExpFormatted(/\1:\s*(.*)/,r.car.reservationId),1),d=e.nextText(r.car.price).nextTag("td7").tagContents(),g=d.innerCapture(/([\d,.]+)/,1),m=d.innerCapture(/([^\d,.]+)/,1),l=d.nextTag("table8").nextDate(),u=l.nextDate(),c=l.parentTag("td7").tagContents().innerCapture(regExpFormatted(/(.*)\s+\1/,""+f),1),h=u.nextTag("td8").nextTag("td8").tagContents().innerCapture(regExpFormatted(/\1:\s+(.*)/,r.car.address),1),T=h,ASSERT(s,l,h,c)?{name:s,reservationId:p,priceCurrency:m,totalPrice:g,pickupTime:l,pickupAddress:h,dropoffTime:u,dropoffAddress:T,brand:f,provider:c}:void 0};switch(o=a.getSpan().nextText(r.itinerary).nextTag("table7"),n=""+o.tagContents().innerCapture(/(\w+):/,1),o=o.parentTag("table6"),n){case r.carName:C(o),v.push(C(o))}for(var y,k=0;v.length>k;k++)y=v[k],i={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:y.totalPrice,priceCurrency:y.priceCurrency,reservationId:y.reservationId,reservationStatus:"http://schema.org/Reservation"+(y.reservationStatus||"Confirmed"),checkinUrl:y.checkinUrl,modifyReservationUrl:y.modifyReservationUrl,cancelReservationUrl:y.cancelReservationUrl,underName:{"@type":"http://schema.org/Person",name:y.name,email:y.email},provider:{"@type":"http://schema.org/Organization",name:y.provider},pickupTime:y.pickupTime,pickupLocation:{"@type":"http://schema.org/Place",name:y.pickupName,telephone:y.pickupTelephone,address:y.pickupAddress},dropoffTime:y.dropoffTime,dropoffLocation:{"@type":"http://schema.org/Place",name:y.dropoffName,telephone:y.dropoffTelephone,address:y.dropoffAddress}},y.brand&&(i.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:y.brand},license:y.license,color:y.color}),x.push(i);return x.length?x:void 0}}).call();
