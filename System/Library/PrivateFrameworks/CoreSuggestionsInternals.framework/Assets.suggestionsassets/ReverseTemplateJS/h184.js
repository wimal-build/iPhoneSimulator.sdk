// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var n,i,p,o,s,l,u,d,g,m,v,h,c,x=[],y=[],A=[],C="easyjet",T="U2";v=regExpFormatted(/\1\s*(.*)/,t.reservationId).exec(e.subject)[1],p=a.getSpan().next(t.itinerary),d=a.getSpan().next(t.payment).nextAnyTag("table").nextAnyTag("td").nextAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s*(.*)\s\2\s/,t.paymentPreFix,t.paymentPostFix),1),g=d.innerCapture(/([\d,.]+)/,1),m=d.innerCapture(/([^\d,.]+)/,1).trim(),n=p.next(t.passengers).parentAnyTag("table").allInnerTags("td5");for(var f=1;n.length>f;f++)i={},i.name=n[f].tagContents(),y.push(i);for(s=p.next(t.arrival);s.exists();)l={},o=s.previous(t.departure),u=o.previousAnyTag("td").previousAnyTag("td").tagContents().innerCapture(regExpFormatted(/($<departure>.*) \1 ($<arrival>\w+)/,t.arrivalAirport)),l.departureAirport=u.$departure.trim(),l.arrivalAirport=(""+u.$arrival).replace("(Flexible)","").trim(),l.departureDate=o.nextDate(),l.arrivalDate=s.nextDate(),l.flightNumber=s.next(t.flight).parentAnyTag("td").tagContents().innerCapture(/(\d+)/,1),l.seats=(""+s.next(t.seat).nextAnyTag("td").tagContents()).split(", "),s=s.next(t.arrival),ASSERT(l.flightNumber,l.departureDate,l.departureAirport,l.arrivalDate,l.arrivalAirport),A.push(l);for(c=0;A.length>c;c++){l=A[c];for(var F=0;y.length>F;F++){i=y[F];var b={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:C,airlineCode:T,flightNumber:l.flightNumber,departureAirportFuzzy:l.departureAirport,departureAirportCode:l.departureAirportCode,departureTime:l.departureDate,arrivalAirportFuzzy:l.arrivalAirport,arrivalAirportCode:l.arrivalAirportCode,arrivalTime:l.arrivalDate},underName:{"@type":"http://schema.org/Person",name:i.name},reservationId:v,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:g,priceCurrency:m,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:h,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:l.seats[F]}}};x.push(b)}}return x.length?x:void 0}}).call();
