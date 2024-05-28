// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,r){var a=Scanner.fromMessage(e);a.setLocale(t);var n,i,g,s,p,o,l,m,d,x,h,u,T,c,C,f,v,b,S,N=[],R={};n=a.getSpan().nextRegExp(r.confirmationCodeRegex).parentAnyTag("td").tagContents().innerCapture(r.confirmationCodeRegexCapture,1),s=a.getSpan().nextText(r.passenger).nextTag("table2").allInnerTags("tr2").map(function(e){return e.allInnerTagsFiltered("td2")}).filter(function(e){return r.namesRegexExcludePassengerText.test(e)||r.namesRegexExcludeContactText.test(e)||r.namesRegexExcludeEmailText.test(e)||r.namesRegexExcludeMembershipText.test(e)||!(e.length>0)?void 0:e}),m=a.getSpan().nextText(r.totalPrice).nextText(r.totalPrice).nextTag("td2").tagContents().innerCapture(/((\d\s)?[\d,.]+)/,1),d=a.getSpan().nextText(r.totalPrice).nextText(r.totalPrice).nextTag("td2").tagContents().innerCapture(/\d\s?[\d,.]+\s(\w+)/,1),f=a.getSpan().nextText(r.membership).nextTag("td3").tagContents(),""!=f&&(S=f.innerCapture(/(\w+)\s\d+/,1),b=f.innerCapture(/\w+\s(\d+)/,1));for(var y=0,A=s.length;A>y;y++)x=s[y],g=""+x[0],R[g]={name:g,programName:S,membershipNumber:b,ticketNumber:x[2],seats:{},seatingType:{},totalPrice:m,priceCurrency:d};var F=[];nbrOfLegs=a.getSpan().tagContents().allInnerTags("th2");for(var w=1;nbrOfLegs.length>=w;w++){o=a.getSpan().nextText(r.tripDetails).nextTag("table2");for(var E=0;w>E;E++)o=o.nextTag("table2");o=o.allInnerTags("tr2").map(function(e){return e.allInnerTagsFiltered("td2")}).filter(function(e){return e.length>0}),F.push(o)}o=[];for(var w=0;F.length>w;w++)o=o.concat(F[w]);for(var I,P,k,w=0;o.length>w;w++)if(!(""+o[w]).match(r.changesRegex))if(x=o[w],x[0].innerCapture(r.flightStatementFlightNbrRegex))p=x[0].nextTag("td2").tagContents(),I=p.innerCapture(/\w+,\s\w+\s(\d+).*/,1),P=p.innerCapture(/\w+,\s(\w+)\s\d+.*/,1),k=p.innerCapture(/\w+,\s\w+\s\d+,\s(\d+)/,1);else if(""+x[0]==r.flightStatementConfirmation){u=""+x[1].nextTag("td4").tagContents().innerCapture(/\d{2}:\d{2}/),u=a.getDetachedSpan(k+" "+I+" "+P+" "+u).innerDate(),T=x[1].nextTag("td4").nextTag("td4").tagContents(),c=""+x[1].nextRegExp(r.flightStatementArrivalRegex).nextTag("td4").tagContents().innerCapture(/\d{2}:\d{2}/),v=""+x[1].nextRegExp(r.flightStatementArrivalRegex).nextTag("td4").tagContents().innerCapture(/\+(\d)/,1),""+parseInt(v)!="NaN"&&""+parseInt(I)!="NaN"&&(I=parseInt(I)+parseInt(v)),c=a.getDetachedSpan(k+" "+I+" "+P+" "+c).innerDate(),C=""+x[1].nextRegExp(r.flightStatementArrivalRegex).nextTag("td4").nextTag("td4").tagContents(),l=x[0].nextText(r.flightStatementFlight).nextTag("td3").tagContents().innerCapture(/(\d{1,4})/,1),h=""+x[0].nextText(r.flightStatementFlight).nextTag("td3").nextTag("td3").nextTag("td3").nextTag("td3").tagContents().innerCapture(r.flightStatementCodeshareRegex,1);{x[0].nextText(r.flightStatementCabin).nextTag("td3").tagContents()}ASSERT(l,u,T,c,C)&&(0==h.length&&(h="US Airways"),N.push({airlineName:h,flightNumber:l,departureAirport:T,departureTime:u,arrivalAirport:C,arrivalTime:c,passengers:R}))}for(var z=[],w=0;N.length>w;w++)for(var D=N[w],M=Object.keys(D.passengers),E=0;M.length>E;E++){var L=D.passengers[M[E]],O={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:D.airlineName,airlineCode:D.airlineCode,flightNumber:D.flightNumber,departureAirportFuzzy:D.departureAirport,departureAirportCode:D.departureCode,departureTime:D.departureTime,arrivalAirportFuzzy:D.arrivalAirport,arrivalAirportCode:D.arrivalCode,arrivalTime:D.arrivalTime},underName:{"@type":"http://schema.org/Person",name:L.name,email:L.email},checkinUrl:i,reservationId:n,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:L.totalPrice,priceCurrency:L.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:L.seats[D.flightNumber],seatingType:L.seatingType[D.flightNumber]}}};L.membershipNumber&&L.programName&&(O.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:L.membershipNumber,programName:L.programName}),z.push(O)}return z.length?z:void 0}}).call();