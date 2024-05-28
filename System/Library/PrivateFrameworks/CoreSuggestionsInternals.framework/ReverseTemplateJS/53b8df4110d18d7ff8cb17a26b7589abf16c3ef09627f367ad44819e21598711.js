// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("alaskaair.com-confirmation-en",function(e){return/^Confirmation Letter - .*? - from Alaska Airlines$/.test(e.subject)},function(e){if(int(e.epoch)<1356998400)return CONTINUE;var r=Scanner.fromMessage(e);r.setLocale("en_US");var t,a,i,n,s,p,m,o,l,u,g,c,h,d,v,b,T,N,f,C=[],$={};if(/^Confirmation Letter/.test(e.subject)){t=r.getSpan().innerCapture(/\bConfirmation Code: (\w+)/,1),a=r.getSpan().nextText("Web Check-In").nextLink(),i=r.getSpan().nextText("SUMMARY OF AIRFARE CHARGES").withEnd(r.getSpan().nextText("Total Fare:").getStart()),u=r.getSpan().innerCapture(/Total Fare: ($<priceCurrency>[A-Z]{3}).*?($<totalPrice>[\d,.]+)\n/),l=u?u.$totalPrice:null,g=u?u.$priceCurrency:null;for(var x=/Traveler: ($<name>.*?)(?:, ($<programName>.*) # ($<membershipNumber>.*))?\nTicket: ($<ticketNumber>[-\d]+).*?\n[^]+?Traveler Total:.*?($<totalPrice>[\d,.]+)?\n/;i.innerRegExp(x).exists();)c=i.innerCapture(x),c&&($[""+c.$name]={name:c.$name,seats:{},seatingType:{},programName:c.$programName,membershipNumber:c.$membershipNumber,totalPrice:c.$totalPrice.result()||l,priceCurrency:g,ticketNumber:c.$ticketNumber}),i=i.withStart(i.innerRegExp(x).getEnd());m=r.getSpan().nextText("FLIGHT INFORMATION").withEnd(r.getSpan().nextText("SUMMARY OF AIRFARE CHARGES").getStart());for(var y,A=concatRegExp(/Flight: ($<airlineName>.*?) ($<flightNumber>\d+)\n[^]+?/,/(?:Confirmation code: ($<tmpReservationId>\w+)\n[^]+?)?/,/Departs: ($<departureAirport>.*?) \(($<departureCode>[A-Z]{3})\) ($<departureTime>.*?)\n/,/Arrives: ($<arrivalAirport>.*?) \(($<arrivalCode>[A-Z]{3})\) ($<arrivalTime>.*?)\n/,/Class: ($<seatingType>.*?)\nSeats: ($<seats>.*?)\n/),S=[],E=/(\d{1,}[A-Z])/;m.innerRegExp(A).exists();){if(p=m.innerCapture(A),valid(p)){for(h=p.$airlineName,o=p.$flightNumber,v=p.$departureAirport,b=p.$departureCode,d=p.$departureTime,N=p.$arrivalAirport,f=p.$arrivalCode,T=p.$arrivalTime,s=p.$seatingType,n=p.$seats,S=[];n.innerRegExp(E).exists();)S.push(n.innerCapture(E,1)),n=n.withStart(n.innerRegExp(E).getEnd());if(valid(o)){i=Object.keys($);for(var R=0;i.length>R;R++)valid(s)&&($[i[R]].seatingType[""+o]=s),valid(S)&&($[i[R]].seats[""+o]=S[R])}y=p.$tmpReservationId,ASSERT(h,o,b,d,f,T)&&C.push({airlineName:h,flightNumber:o,reservationId:y,departureAirport:v,departureCode:b,departureTime:d,arrivalAirport:N,arrivalCode:f,arrivalTime:T,passengers:$})}m=m.withStart(m.innerRegExp(A).getEnd())}}for(var k=[],F=0;C.length>F;F++)for(var I=C[F],z=Object.keys(I.passengers),P=0;z.length>P;P++){var M=I.passengers[z[P]];schema={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:I.airlineName,airlineCode:I.airlineCode,flightNumber:I.flightNumber,departureAirportFuzzy:I.departureAirport,departureAirportCode:I.departureCode,departureTime:I.departureTime,arrivalAirportFuzzy:I.arrivalAirport,arrivalAirportCode:I.arrivalCode,arrivalTime:I.arrivalTime},underName:{"@type":"http://schema.org/Person",name:M.name},checkinUrl:a,reservationStatus:"http://schema.org/Reservation"+(I.reservationStatus||"Confirmed"),reservationId:valid(I.reservationId)?I.reservationId:t,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:M.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:M.seats[I.flightNumber],seatingType:M.seatingType[I.flightNumber]}},totalPrice:M.totalPrice,priceCurrency:M.priceCurrency},not(M.membershipNumber)||(schema.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:M.membershipNumber,programName:M.programName}),k.push(schema)}return k.length?k:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/127/181/183","SG767719db"),new ReverseTemplate("alaskaair.com-itineraries-receipts-en",function(e){return/^(?:Receipt|Itinerary)? sent from alaskaair\.com/.test(e.subject)},function(e){function r(e,r,t,a,i,n,p,m){s=Object.keys(p);for(var o=0;s.length>o;o++)not(m)||(p[s[o]].seatingType[""+r]=m),p[s[o]].seats[r]=p[s[o]].seatList[y.length];ASSERT(e,r,t,a,i,n)&&y.push({airlineName:e,flightNumber:r,departureCode:t,departureTime:a,arrivalCode:i,arrivalTime:n,passengers:p})}if(int(e.epoch)<1356998400)return CONTINUE;var t=Scanner.fromMessage(e);t.setLocale("en_US");var a,i,n,s,p,m,o,l,u,g,c,h,d,v,b,T,N,f,C,$,x,y=[],A={};if(/^(?:Receipt|Itinerary) sent from alaskaair\.com/.test(e.subject)){s=t.getSpan().nextText("Traveler Information").nextTag("table1").allInnerTags("tr1").map(function(e){return e.allInnerTagsFiltered("td1")});for(var S=1;s.length>S;S++)s[S].length>2&&(u=s[S][0].innerCapture(/\bName:\s+($<name>.*)\s+MP#:\s+(?:($<membershipNumber>.*)\s+-\s+($<programName>.*)\s+)?E-Ticket:(?:\s+($<ticketNumber>\d+))?/),u&&(n=(""+u.$name.trim()).replace(/\s{2,}/," "),N=u.$programName.trim(),f=u.$membershipNumber,C=u.$ticketNumber),$=s[S][1].split(",").map(function(e){return""+e.trim()=="No Seats"?"":e.trim()}),valid(n)&&(l=t.getSpan().nextRegExp(RegExp("Airfare for "+regExpEscape(n))).parentTag("tr1").lastInnerTag("td1").tagContents().innerCapture(/([\d,.]+)/,1),not(l)&&(l=t.getSpan().innerCapture(/Total per Traveler\s+.*?([\d,.]+)/,1)),A[n]={name:n,programName:N,membershipNumber:f,ticketNumber:C,totalPrice:l,seatList:$,seats:{},seatingType:{}}));if(m=t.getSpan().nextText("Departs").nextText("Arrives").parentTag("table1").allInnerTags("td1").filter(function(e){return e.innerTag("table2").exists()}),0===m.length){m=t.getSpan().nextText("Departs").nextText("Arrives").parentTag("table1").allInnerTags("td1").filter(function(e){return e.innerText("Details for Flights").exists()});for(var E=0;m.length>E;E++)p=m[E],g=p.innerCapture(/($<name>.*)\s+($<flightNumber>\d+)/),c=g?g.$name.trim():null,o=g?g.$flightNumber.trim():null,d=p.innerCapture(/Depart (?:.*)\(([A-Z]{3})\)/,1),h=getFuzzyDate(p.innerCapture(regExpFormatted(/\(\1\)\s+(.*)/,""+d),1)),b=p.innerCapture(/Arrive (?:.*)\(([A-Z]{3})\)/,1),v=getFuzzyDate(p.innerCapture(regExpFormatted(/\(\1\)\s+(.*)/,""+b),1)),T=null,valid(c,o)&&(T=p.innerCapture(RegExp(regExpEscape(""+c)+"\\s+"+regExpEscape(""+o)+"\\s+(.*?)\\s+\\|"),1)),r(c,o,d,h,b,v,A,T)}else for(var E=0;m.length>E;E++)p=m[E].innerTag("table2").allInnerTagsFiltered("td2"),p.length>=5&&(g=p[0].innerCapture(/($<name>.*)\s+($<flightNumber>\d+)/),c=g?g.$name.trim():null,o=g?g.$flightNumber:null,d=p[1].innerCapture(/\(([A-Z]{3})\)/,1),h=getFuzzyDate(p[2]),b=p[3].innerCapture(/\(([A-Z]{3})\)/,1),v=getFuzzyDate(p[4]),T=null,valid(c,o)&&(T=m[E].innerCapture(RegExp(regExpEscape(""+c)+"\\s+"+regExpEscape(""+o)+"\\s+(.*?)\\s+\\|"),1)),r(c,o,d,h,b,v,A,T))}for(var R=[],E=0;y.length>E;E++)for(var k=y[E],F=Object.keys(k.passengers),I=0;F.length>I;I++){var z=k.passengers[F[I]];x={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:k.airlineName,airlineCode:k.airlineCode,flightNumber:k.flightNumber,departureAirportFuzzy:k.departureAirport,departureAirportCode:k.departureCode,departureTime:k.departureTime,arrivalAirportFuzzy:k.arrivalAirport,arrivalAirportCode:k.arrivalCode,arrivalTime:k.arrivalTime},underName:{"@type":"http://schema.org/Person",name:z.name},checkinUrl:i,reservationStatus:"http://schema.org/Reservation"+(k.reservationStatus||"Confirmed"),reservationId:valid(k.reservationId)?k.reservationId:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:z.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:z.seats[k.flightNumber],seatingType:z.seatingType[k.flightNumber]}},totalPrice:z.totalPrice,priceCurrency:z.priceCurrency},not(z.membershipNumber)||(x.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:z.membershipNumber,programName:z.programName}),R.push(x)}return R.length?R:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/127/181/184","SG5be839a5")]);