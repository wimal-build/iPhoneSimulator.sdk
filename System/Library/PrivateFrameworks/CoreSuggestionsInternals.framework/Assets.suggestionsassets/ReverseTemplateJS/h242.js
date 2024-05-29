// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){e.plain=e.plain.replace(regExpFormatted(/\1[\s\S]+/,r.endOfMessage),"");var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,g,l,p,o,s,h,u,d,f,m,c,x,v,T,D,S,C,y,P,I,N=a.getSpan(),b=[],F=[],A=[];for(i=N.innerCapture(regExpFormatted(/\1\s*(.+)/,r.reservationIdPrefix),1),g=N.next(r.priceInfoPrefix).next(/\d+[.,]\d+/).parentTag("td1").tagContents(),g.exists()&&(l=g.innerCapture(/([\d,.]+)/,1),p=g.innerCapture(/([^\d,.]+)/,1).trim()),C=N.next(r.passengerPrefix1).next(r.passengerPrefix2).nextTag("table1"),s=N.withInterval(C.getStart(),C.next(r.passengerSuffix).getStart()).allInnerTags("table1"),I=0;s.length>I;I++)y=s[I].allInnerTags("td1"),2>y.length||(o=y[1].tagContents().rstrip("*"),o.getLength()&&b.push({underPersonName:o}));for(C=N.next(r.flightPrefix1).next(r.flightPrefix2).nextTag("table1").nextTag("table1"),h=N.withInterval(C.getStart(),C.next(r.flightSuffix).getStart()).allInnerTags("table1"),I=0;h.length>I;I++)y=h[I].allInnerTags("td1"),5===y.length&&(P=y[2].innerCapture(r.flightRegExp),P&&7===P.length&&([,m,c,,u,d,f]=P,""+d=="TOM"&&(d="BY")),P=y[4].innerCapture(r.flightTimeRegExp),P&&4===P.length&&([,x,v,T]=P,D=a.getDetachedSpan(""+x+" "+v).innerDate(),S=a.getDetachedSpan(""+x+" "+T).innerDate(),Date.parse(a.getDateDD(S).iso8601)<Date.parse(a.getDateDD(D).iso8601)&&(S=modifyDate(S,1))),ASSERT(d,f)&&F.push({departureAirport:m,arrivalAirport:c,airlineName:u,airlineCode:d,flightNumber:f,departureDateTime:D,arrivalDateTime:S}));return b.forEach(function(e){F.forEach(function(t){var r={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:t.airlineName,airlineCode:t.airlineCode,flightNumber:t.flightNumber,departureAirportFuzzy:t.departureAirport,departureTime:t.departureDateTime,arrivalAirportFuzzy:t.arrivalAirport,arrivalTime:t.arrivalDateTime},underName:{"@type":"http://schema.org/Person",name:e.underPersonName},checkinUrl:n,reservationId:i,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:l,priceCurrency:p,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}}};A.push(r)})}),A.length>=1?A:void 0}}).call();
