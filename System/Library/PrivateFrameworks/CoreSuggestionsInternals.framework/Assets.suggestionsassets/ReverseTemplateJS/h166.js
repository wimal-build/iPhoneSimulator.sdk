// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,r,t){var a=Scanner.fromMessage(e);a.setLocale(r);var i,n,p,o,s,u=[],l=[];t.reservationId.test(e.subject)&&(o=t.reservationId.exec(e.subject)[1]);for(var d=a.getSpan().next(t.itinerary);d.exists();)i={},n=regExpFormatted(/\1\s*(.*)/,t.departureAirport),i.departureAirport=d.next(n).innerCapture(n,1),n=regExpFormatted(/\n\1\s*(.*)/,t.arrivalAirport),i.arrivalAirport=d.next(n).innerCapture(n,1),n=regExpFormatted(/\1\s*($<airlineCode>\D+)($<flightNr>\d+)/,t.flight),p=d.next(n).innerCapture(n),i.airlineCode=p.$airlineCode,i.flightNumber=p.$flightNr,n=regExpFormatted(/\1\s*\D+\s+(.*)/,t.depart),i.departureDate=a.getDetachedSpan((""+d.next(n).innerCapture(n,1)).replace(/\,/g,"")).innerDate(),n=regExpFormatted(/\1\s*\D+\s+(.*)/,t.arrival),i.arrivalDate=a.getDetachedSpan((""+d.next(n).innerCapture(n,1)).replace(/\,/g,"")).innerDate(),n=regExpFormatted(/\1\s*(.*)/,t.cabin),i.seatType=d.next(n).innerCapture(n,1),n=regExpFormatted(/\1\s*(.*)/,t.codeShare),i.airlineName=d.next(n).innerCapture(n,1),n=regExpFormatted(/\1\s*(.*)/,t.passenger),i.passengerName=d.next(n).innerCapture(n,1),ASSERT(i.airlineName,i.airlineCode,i.flightNumber,i.departureDate,i.departureAirport,i.arrivalDate,i.arrivalAirport)&&l.push(i),d=d.next(t.itinerary);for(var g=0;l.length>g;g++){s=l[g];var m={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:s.airlineName,airlineCode:s.airlineCode,flightNumber:s.flightNumber,departureAirportFuzzy:s.departureAirport,departureTime:s.departureDate,arrivalAirportFuzzy:s.arrivalAirport,arrivalTime:s.arrivalDate},underName:{"@type":"http://schema.org/Person",name:s.passengerName},reservationId:o,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:s.price,priceCurrency:s.currency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:s.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:s.seatNumber,seatingType:s.seatType}}};u.push(m)}return u.length?u:void 0}}).call();
