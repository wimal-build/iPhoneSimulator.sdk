// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,i,o,c,p=a.getSpan(),s=[],h=[],m=[],l=[];o=p.next(t.reservationId_prefix).nextAnyTag("td").tagContents();var d=p.next(t.reservationId_prefix).nextAnyTag("table").allInnerTags("tr5");d.forEach(function(e){var r=e.nextAnyTag("td").tagContents();if(""+r=="\ud56d\uacf5\uad8c"||""+r=="\uc219\ubc15"||""+r=="\ub80c\ud130\uce74"){c=(""+r.nextAnyTag("td").tagContents()).split(",")[0].trim();var t=r.nextAnyTag("td").tagContents().split("~"),p=getFuzzyDate(a.getDetachedSpan(""+t[0])),s=getFuzzyDate(a.getDetachedSpan(""+t[1])),d=r.nextAnyTag("td").nextAnyTag("td").tagContents();d=/(.*) (.)/.exec(d),n=d[1],i=d[2],ASSERT(p,s),""+r=="\ud56d\uacf5\uad8c"?h.push({reservationId:o,totalPrice:n,priceCurrency:i,departureTime:p,arrivalTime:s}):""+r=="\uc219\ubc15"?m.push({reservationId:o,totalPrice:n,priceCurrency:i,checkInDateTime:p,checkOutDateTime:s,hotelName:c}):""+r=="\ub80c\ud130\uce74"&&l.push({reservationId:o,totalPrice:n,priceCurrency:i,pickupTime:p,dropoffTime:s})}});for(var u,g,v=0;h.length>v;v++)g=h[v],u={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:g.airlineName,airlineCode:g.airlineCode,flightNumber:g.flightNumber,departureAirportFuzzy:g.departureAirport,departureAirportCode:g.departureCode,departureTime:g.departureTime,arrivalAirportFuzzy:g.arrivalAirport,arrivalAirportCode:g.arrivalCode,arrivalTime:g.arrivalTime},underName:{"@type":"http://schema.org/Person",name:g.underName},checkinUrl:g.checkinUrl,reservationId:g.reservationId,reservationStatus:"http://schema.org/Reservation"+(g.reservationStatus||"Confirmed"),totalPrice:g.totalPrice,priceCurrency:g.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:g.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:g.seatNumber,seatingType:g.seatingType}}},s.push(u);for(var y,v=0;l.length>v;v++)y=l[v],u={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:y.totalPrice,priceCurrency:y.priceCurrency,reservationId:y.reservationId,reservationStatus:"http://schema.org/Reservation"+(y.reservationStatus||"Confirmed"),checkinUrl:y.checkinUrl,modifyReservationUrl:y.modifyReservationUrl,cancelReservationUrl:y.cancelReservationUrl,underName:{"@type":"http://schema.org/Person",name:y.name,email:y.email},provider:{"@type":"http://schema.org/Organization",name:y.provider},pickupTime:y.pickupTime,pickupLocation:{"@type":"http://schema.org/Place",name:y.pickupName,telephone:y.pickupTelephone,address:y.pickupAddress},dropoffTime:y.dropoffTime,dropoffLocation:{"@type":"http://schema.org/Place",name:y.dropoffName,telephone:y.dropoffTelephone,address:y.dropoffAddress}},y.brand&&(u.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:y.brand},license:y.license,color:y.color}),s.push(u);for(var f,v=0;m.length>v;v++)f=m[v],u={"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:f.underName,email:f.underNameEmail},totalPrice:f.totalPrice,priceCurrency:f.priceCurrency,checkinTime:f.checkInDateTime,checkoutTime:f.checkOutDateTime,modifyReservationUrl:f.modifyReservationUrl,cancelReservationUrl:f.cancelReservationUrl,reservationStatus:"http://schema.org/Reservation"+(f.reservationStatus||"Confirmed"),reservationId:f.reservationId,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:f.hotelName,url:f.hotelUrl,telephone:f.hotelPhone,address:f.hotelAddress}},s.push(u);return s.length?s:void 0}}).call();
