// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,o,p,i,s,g,c,m,d,h,l,u;if(r=a.getSpan().next(n.total).nextTag("td2").tagContents(),o=r.innerCapture(/([\d\.,]+)/,1),p=r.innerCapture(/([A-Z]{3})/,1),u=a.getSpan().next(n.reference).nextTag("td2").tagContents(),i=a.getSpan().innerCapture(n.underName,1),s=a.getSpan().next(n.supplier).nextTag("td2").tagContents(),g=a.getSpan().next(n.pickUp).nextDate(),m=g.parentTag("td2").tagContents().withStart(g.getEnd()).trim(),c=a.getSpan().next(n.dropOff).nextDate(),d=c.parentTag("td2").tagContents().withStart(c.getEnd()).trim(),ASSERT(s,i,m,g)){var f={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:o,priceCurrency:p,reservationId:u,reservationStatus:"http://schema.org/ReservationConfirmed",modifyReservationUrl:h,cancelReservationUrl:h,underName:{"@type":"http://schema.org/Person",name:i},provider:{"@type":"http://schema.org/Organization",name:s},pickupTime:g,pickupLocation:{"@type":"http://schema.org/Place",name:m,telephone:"",address:""},dropoffTime:c,dropoffLocation:{"@type":"http://schema.org/Place",name:d,telephone:"",address:""},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:l}}};return[f]}}}).call();
