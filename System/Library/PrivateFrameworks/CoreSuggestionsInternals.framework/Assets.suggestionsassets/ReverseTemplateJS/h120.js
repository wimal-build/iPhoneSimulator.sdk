// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,o,i,p,s,c,g,d,m,h,l,x,y,v,u,C,f,S,T,A,R,k,D;return i=a.getSpan().next(n.reservationId).nextAnyTag("td").tagContents().innerCapture(/([\d\w]+)/,1),h=a.getSpan().next(n.vehicleDetails).next(n.guestName).nextAnyTag("td").tagContents(),R=a.getSpan().next(n.pickup).nextAnyTag("td").nextAnyTag("td").tagContents(),A=R.innerDate(),S=(""+R).replace(""+A,""),k=a.getSpan().next(n.dropoff).nextAnyTag("td").nextAnyTag("td").tagContents(),C=k.innerDate(),v=(""+k).replace(""+C,""),r=a.getSpan().next(n.driverDetails).next(n.name).nextAnyTag("td").tagContents(),c=a.getSpan().next(n.modifyUrl).nextLink(),D=a.getSpan().next(n.price).nextAnyTag("td").tagContents(),d=D.innerCapture(/([\d,.]+)/,1),m=D.innerCapture(/([^\d,.]+)/,1).trim(),ASSERT(S,v,A,C)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:d,priceCurrency:m,reservationId:i,reservationStatus:"http://schema.org/Reservation"+(p||"Confirmed"),checkinUrl:s,modifyReservationUrl:c,cancelReservationUrl:g,underName:{"@type":"http://schema.org/Person",name:r,email:o},provider:{"@type":"http://schema.org/Organization",name:"Vroomvroomvroom"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h},license:l,color:x},pickupTime:A,pickupLocation:{"@type":"http://schema.org/Place",name:f,telephone:T,address:S},dropoffTime:C,dropoffLocation:{"@type":"http://schema.org/Place",name:y,telephone:u,address:v}}]:void 0}}).call();
