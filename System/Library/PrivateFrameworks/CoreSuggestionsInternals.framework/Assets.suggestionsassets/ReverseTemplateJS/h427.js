// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,a){var n=Scanner.fromMessage(e);n.setLocale(t);var r,o,p,g,c,s,i,d,l,m,h,x,u,C,f,v,S,T,y,D,R,k;return r=n.getSpan().next(a.total).parentTag("td7").tagContents().innerCapture(regExpFormatted(/\1(.*)/,a.total),1).trim(),o=r.innerCapture(/([\d\.,]+)/,1),p=r.innerCapture(/([^\d\.,]+)/,1),d=n.getSpan().next(a.reserved).nextTag("td5").tagContents(),R=n.getSpan().next(a.pickUp).nextDate(),f=R.nextTag("td7").nextTag("td7").tagContents(),u=n.getDetachedSpan((""+R.nextAnyTag("td").tagContents()).replace(/ago,/,"august")+" "+R).innerDate(),R=n.getSpan().next(a.dropOff).nextDate(),T=R.nextTag("td7").nextTag("td7").tagContents(),C=n.getDetachedSpan((""+R.nextAnyTag("td").tagContents()).replace(/ago,/,"august")+" "+R).innerDate(),m=n.getSpan().next(a.dropOff).nextTag("td6").tagContents(),g=n.getSpan().innerCapture(regExpFormatted(/\1 (\d+)/,a.reservationId),1),k=a.cancelled.test(e.subject)||a.cancelled.test(e.plain)?"Cancelled":"Confirmed",ASSERT(d,u)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:o,priceCurrency:p,reservationId:g,reservationStatus:"http://schema.org/Reservation"+k,checkinUrl:c,modifyReservationUrl:s,cancelReservationUrl:i,underName:{"@type":"http://schema.org/Person",name:d,email:l},provider:{"@type":"http://schema.org/Organization",name:"Expedia"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:m},license:h,color:x},pickupTime:u,pickupLocation:{"@type":"http://schema.org/Place",name:f,telephone:v,address:S},dropoffTime:C,dropoffLocation:{"@type":"http://schema.org/Place",name:T,telephone:y,address:D}}]:void 0}}).call();
