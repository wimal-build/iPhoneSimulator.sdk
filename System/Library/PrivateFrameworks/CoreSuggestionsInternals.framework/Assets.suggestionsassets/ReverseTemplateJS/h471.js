// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){function e(e){return(""+e.tagContents().trim()).length>0}return function(t,r,a){var n=Scanner.fromMessage(t);n.setLocale(r);for(var i,p=n.getSpan().nextText(a.pricePrefix).nextTag("td3").nextTag("td3").tagContents().innerCapture(a.currency),g=p.$price.trim(),s=p.$currency.trim(),o=n.getSpan().nextText(a.reservationIdPrefix).parentTag("td3").innerCapture(RegExp(regExpEscape(a.reservationIdPrefix)+"(.+)"),1).trim(),l=n.getSpan().nextText(a.reservationIdPrefix).nextTag("table3").allInnerTags("table4"),m=[],d=0;l.length>d;d++){i=l[d];var h=i.allInnerTags("td4").filter(e),u=h[1].innerDate(),c=h[3].innerDate(),v=combineDateAndTime(u,c),T=n.getSpan().withInterval(c.parentTag("td4").tagContents().getStart(),c.getStart()).trim(),f=h[5].innerDate(),x=combineDateAndTime(u,f),S=n.getSpan().withInterval(f.parentTag("td4").tagContents().getStart(),f.getStart()).trim(),C=h[6].innerCapture(/(?:\n|\s)($<name>.*?)\s+\(($<code>\w+)\s*($<number>\d+)\)/);if(C)var b=C.$name,y=C.$code,N=C.$number;ASSERT(b,y,N,v,T,x,S)&&m.push({departureDateTime:v,departureAirport:T,arrivalDateTime:x,arrivalAirport:S,airlineName:b,airlineCode:y,flightNumber:N})}var I,A=[];if(a.passengerName){I=n.getSpan().next(a.passengerHeader).next(a.passengerName);do{var D=I.innerCapture(a.passengerName,1);A.push(""+D),I=I.next(a.passengerName)}while(0!==(""+I).length)}else{I=n.getSpan().nextText(a.passengerHeader).parentTag("table3").allInnerTags("tr3"),I.splice(0,1);for(var $=0;I.length>d;d++){var z=I[$].allInnerTags("td3");if(0===z.filter(e).length)break;A.push(z[0].tagContents())}}var F,P,k,w=[];for(d=0;m.length>d;d++)for(P=m[d],$=0;A.length>$;$++)k=A[$],F={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:P.airlineName,airlineCode:P.airlineCode,flightNumber:P.flightNumber,departureAirportFuzzy:P.departureAirport,departureTime:P.departureDateTime,arrivalAirportFuzzy:P.arrivalAirport,arrivalTime:P.arrivalDateTime},underName:{"@type":"http://schema.org/Person",name:k},reservationId:o,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:g,priceCurrency:s,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat"}}},w.push(F);return w.length?w:void 0}}).call();
