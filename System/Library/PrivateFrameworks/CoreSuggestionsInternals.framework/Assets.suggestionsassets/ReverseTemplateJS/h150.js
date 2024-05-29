// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){var a,n,i,m,g,p,o,s,l,d,x,T,h,u,b,c,v=[],f=Scanner.fromMessage(e),C=[];f.setLocale(t);var N,y,F;for(N=f.getSpan().nextTag("table1"),y=N.nextTag("tr1").nextTag("tr1"),d=y.nextText(r.reservationIdLabel).parentTag("td1").innerCapture(regExpFormatted(/\1\s*([A-Za-z0-9]*)/,r.reservationIdLabel),1).tagContents(),y=N.nextText(r.passengerCellTitle).nextTag("tr1");y!==f.getNullSpan()&&-1===(""+y.nextTag("td1")).indexOf(r.fromLabel);){var L={},S=y.allInnerTags("td1");if(y=y.nextTag("tr1"),!(2>S.length)){L.ticketNumber=S[1].tagContents().trim(),L.name=S[0].tagContents();var E=f.getSpan().nextText(r.id);E.exists()&&S.length>=4&&(L.membershipNumber=S[2].tagContents().trim(),L.programName=E.nextTag("td1").tagContents()),v.push(L)}}var k,z,A,$;for(y=y.nextText(r.fromLabel).parentTag("tr1");y!==f.getNullSpan();){F=y.nextTag("td1"),m=F.tagContents().innerCapture(regExpFormatted(/\1\s*([\w \.\-]*)/,r.fromLabel),1).trim(),F=F.nextTag("td1"),o=F.innerCapture(regExpFormatted(/\1\s*([\w \.\-]*)/,r.toLabel),1).trim(),F=F.nextTag("td1"),k=F.tagContents().innerCapture(regExpFormatted(/\1\s+($<airlineCode>\w{2})($<flightNumber>\w+)\s+/,r.flight)),k&&(n=k.$airlineCode,i=k.$flightNumber),a="",-1!==(""+F.nextTag("td1").nextTag("td1")).indexOf(r.codeshareLabel)&&(a=F.nextTag("td1").nextTag("td1").innerCapture(regExpFormatted(/\1\s+([^\[]*).*$/,r.codeshareLabel),1).trim()),p=F.nextText(r.departureTimeLabel).nextDate(),b=p.split(", "),b&&2===b.length&&(A=b[0]),u=F.nextText(r.class).parentTag("td1").innerCapture(regExpFormatted(/\1\s+([^\[]*).*$/,r.class),1).trim(),h=F.next(r.seatNumber).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)\s+\2/,r.seatNumber,r.class),1);var D=0;if(l=F.nextText(r.arrivalTimeLabel).nextDate(),-1!==(""+F.nextText(r.arrivalTimeLabel).parentTag("td1")).indexOf("+1")&&(D=1),c=l.split(", ")){if(1===c.length&&A){$=c[0];var w=f.getDetachedSpan(""+A+" "+$);l=w.innerDate(),l=modifyDate(l,D)}}else l=null;if(ASSERT(n,i,p,m,l,o))for(var L=0;v.length>L;L++){var I=v[L],z={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:a,airlineCode:n,flightNumber:i,departureAirportFuzzy:m,departureAirportCode:g,departureTime:p,arrivalAirportFuzzy:o,arrivalAirportCode:s,arrivalTime:l},underName:{"@type":"http://schema.org/Person",name:I.name},checkinUrl:"",reservationId:d,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:x,priceCurrency:T,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:I.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatingType:u,seatNumber:h}}};valid(OR(I.membershipNumber,I.programName))&&(z.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:I.membershipNumber,programName:I.programName}),C.push(z)}y=y.nextTag("tr1").nextText(r.fromLabel).parentTag("tr1")}return C.length?C:void 0}}).call();
