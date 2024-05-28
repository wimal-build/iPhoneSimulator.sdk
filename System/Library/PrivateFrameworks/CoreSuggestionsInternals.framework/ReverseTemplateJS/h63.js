// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,p,o,g,l,u=[],d=[],m=[];p=a.getSpan().nextText(r.pnr).parentTag("td2").tagContents().innerCapture(regExpFormatted(/\1 (.*)/,r.pnr),1),o=a.getSpan().nextText(r.total).nextTag("td6").nextTag("td6"),g=a.getDetachedSpan(o.tagContents().innerCapture(regExpFormatted(/([\d\.,]+)/),1)+o.nextTag("td6").tagContents().trim()),l=o.tagContents().innerCapture(regExpFormatted(/([^\d\.,]+)/),1).trim(),n=a.getSpan().nextTag("table6").allInnerTags("tr6");for(var s=0;n.length>s;s+=2){var h={};h.name=n[s].innerTag("td6").nextTag("td6").tagContents(),h.ticketNumber=n[s+1].lastInnerTag("td6").tagContents().innerCapture(regExpFormatted(/(\d+)/),1),d.push(h)}i=a.getSpan().nextTag("table5").nextTag("table5").allInnerTags("tr5");for(var c=0;i.length-1>c;c++){var T,v=i[c].allInnerTags("td5"),z={};7>v.length||(T=v[1].innerDate(),z.flightNumber=v[0].tagContents().innerCapture(regExpFormatted(/(.*)\n/m),1).trim(),z.departureTime=getFuzzyDate(a.getDetachedSpan(T+" "+v[2].innerDate())),z.arrivalTime=getFuzzyDate(a.getDetachedSpan(T+" "+v[5].innerDate())),z.departureAirportFuzzy=v[3].tagContents(),z.arrivalAirportFuzzy=v[6].tagContents(),ASSERT(z.arrivalAirportFuzzy,z.departureAirportFuzzy,z.flightNumber,z.departureTime,z.arrivalTime)&&u.push(z))}for(var C=0;u.length>C;C++)for(var z=u[C],F=0;d.length>F;F++){var h=d[F],y={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:"Alitalia Linee Aeree Italiane",airlineCode:"AZ",flightNumber:z.flightNumber,departureAirportFuzzy:z.departureAirportFuzzy,departureAirportCode:z.departureAirportCode,departureTime:z.departureTime,arrivalAirportFuzzy:z.arrivalAirportFuzzy,arrivalAirportCode:z.arrivalAirportCode,arrivalTime:z.arrivalTime},underName:{"@type":"http://schema.org/Person",name:h.name},checkinUrl:"",reservationId:p,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:g,priceCurrency:l,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:h.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:"",seatingType:""}}};m.push(y)}return m.length?m:void 0}}).call();