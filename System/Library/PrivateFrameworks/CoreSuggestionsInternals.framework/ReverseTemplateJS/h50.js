// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,r,t){function a(e,r){T=e.innerCapture(E),v=c=null;var t;T&&(t=x[""+T.$month]||""+T.$month,v=i.getDetachedSpan(""+T.$day+("MAY"===t?"":" ")+t+" "+T.$time).innerDate()),N=r.innerCapture(E);var a="";return N?(t=x[""+N.$month]||""+N.$month,a=""+N.$day+("MAY"===t?"":" ")+t+" "+N.$time):S.test(r)&&T&&(a=""+T.$day+("MAY"===t?"":" ")+t+" "+r.innerCapture(S,1)),c=i.getDetachedSpan(a).innerDate(),{departureTime:v,arrivalTime:c}}function n(){function e(e){for(var r={},t=1,a=[],n=0;e.length>n;n++)r[e[n]]||(r[e[n]]=t++),a.push(r[e[n]]);return a}if(y.length){for(var r,t=[],a=i.getSpan().firstRegExp(/.*Baggage charges for your itinerary will be governed by.*/),n=a.allInnerCapture(/BAG ALLOWANCE -($<origin>[A-Z]{3})($<destination>[A-Z]{3})-/),g=0;r=n[g];g++)t.push(r.$origin,r.$destination);if(y.length==t.length/2)for(var g=0;y.length>g;g++)F[y[g].departureAirport]=t[2*g],F[y[g].arrivalAirport]=t[2*g+1];else{if(F[y[0].departureAirport]=t[0],F[y[y.length-1].arrivalAirport]=t[t-1],y.length%2===0){for(var p=!0,g=0;y.length/2>g;g++){var l=y[g],s=y[y.length-1-g];if(l.departureAirport.getString()!=s.arrivalAirport.getString()||l.arrivalAirport.getString()!=s.departureAirport.getString()){p=!1;break}}if(p){var o=t.slice();if(o.reverse(),arraysEqual(t,o)){var m=y[y.length/2];F[m.departureAirport]=t[t.length/2]}}}for(var h=[],g=0;y.length>g;g++){var u=y[g];F[u.departureAirport]||h.push(u.departureAirport.getString()),F[u.arrivalAirport]||h.push(u.arrivalAirport.getString())}for(var d={},T=Object.keys(F),g=0;T.length>g;g++)d[F[T[g]]]=!0;for(var v=[],g=0;t.length>g;g++)d[t[g]]||v.push(t[g]);if(arraysEqual(e(h),e(v)))for(var g=0;h.length>g;g++)F[h[g]]=v[g]}}}if(!e||!r||!t)return CONTINUE;t.itineraryHeader=t.itineraryHeader||[],t.passengerHeader=t.passengerHeader||[];var i=Scanner.fromMessage(e);i.setLocale(r);var g,p,l,s,o,m,h,u,d,T,v,f,A,N,c,C,b,y=[],I={},E=/($<day>\d{2})($<month>\w{3})\s+($<time>.*)/,S=/(\d{1,2}:\d{2} (?:[A|P]M|N))/,x={ABR:"APR"},F={"DALLAS FT WORTH":"DFW","NEW YORK JFK":"JFK","LOS ANGELES":"LAX","MIAMI INTERNTNL":"MIA","CHICAGO OHARE":"ORD",CHARLOTTE:"CLT",PHILADELPHIA:"PHL",PHOENIX:"PHX","WASHINGTON REAGAN":"DCA"};if("VERSION 1"==t.emailType){for(var H=i.getSpan(),$=0,O=t.passengerHeader.length;O>$;$++)H=H.firstText(t.passengerHeader[$]);if(H=H.parentTag("table3").allInnerTags("table4"),!H.length)return CONTINUE;for(var R=H[0].allInnerTagsFiltered("td4"),P=H[1].allInnerTags("td4"),L=H[H.length-1].allInnerTags("td4"),k=H[H.length-3].innerTag("td4").tagContents().innerCapture(/-([A-Z]{3})$/,1),$=1;R.length>$;$++)l=R[$],I[""+l]={name:l,seats:{},seatingType:{},ticketNumber:P[$].tagContents(),totalPrice:L[$].tagContents(),priceCurrency:k};for(var D=i.getSpan(),$=0,O=t.itineraryHeader.length;O>$;$++)D=D.nextText(t.itineraryHeader[$]);if(D=D.parentTag("tr2"),!D.exists())return CONTINUE;o=D.parentTag("table2").withStart(D.getStart()).allInnerTags("tr3");for(var M,U,z,$=2;o.length>$;){for(M=o[$].allInnerTagsFiltered("td3"),u=M[0],d="AA",m=M[1],f=M[2],C=M[4],s=a(M[3],M[5]),v=s.departureTime,c=s.arrivalTime,z=$+1,U=0;o.length>z&&o[z].allInnerTagsFiltered("td3").length<7;z++,U++);for(var w=1;U>=w;w++)regExpFormatted(/\1/,t.operatedBy).test(""+o[$+w])||(h=o[$+w].allInnerTags("td3"),l=(""+h[0].tagContents()).toUpperCase(),valid(m)&&I[l]&&(valid(I[l].membershipNumber)||(I[l].membershipNumber=h[1].tagContents().innerCapture(regExpFormatted(/\1: (.*)/,t.ff),1)),I[l].seatingType[""+m]=h[2].tagContents(),I[l].seats[""+m]=h[3].tagContents().innerCapture(regExpFormatted(/\1 (.*)/,t.seat),1)));ASSERT(u,d,m,f,v,C,c)&&y.push({airlineName:u,airlineCode:d,flightNumber:m,departureAirport:f,departureTime:v,arrivalAirport:C,arrivalTime:c,passengers:I}),u=d=m=f=v=A=C=c=b=null,$+=1+U}g=i.getSpan().nextRegExp(regExpFormatted(/\1/,t.reservationIdPrefix)).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1:\s+(.*)/,t.reservationIdPrefix),1)}else if("VERSION 2"==t.emailType){for(var H=i.getSpan(),$=0,O=t.passengerHeader.length-1;O>$;$++)H=H.firstText(t.passengerHeader[$]);if(H=H.parentTag("table1").allInnerTags("tr1").map(function(e){return e.allInnerTagsFiltered("td1")}).filter(function(e){return e.length>0}),!H.length)return CONTINUE;H[0].length>2&&(k=H[0][H[0].length-3].innerCapture(/-([A-Z]{3})/,1));for(var $=1,O=H.length;O>$;$++)h=H[$],h.length>=2&&(l=h[0],I[""+l]={name:l,ticketNumber:h[1],totalPrice:h.length>=5?h[h.length-1]:null,priceCurrency:k,seats:{},seatingType:{}});for(var D=i.getSpan(),$=0,O=t.itineraryHeader.length;O>$;$++)D=D.nextText(t.itineraryHeader[$]);if(D=D.parentTag("tr2"),!D.exists())return CONTINUE;o=D.parentTag("table2").withStart(D.getEnd()).allInnerTags("tr2");for(var M,G,W,$=0;o.length>$;$++)o[$].innerDate().exists()?(M=o[$].allInnerTagsFiltered("td2"),G=W=u=d=m=f=v=C=c=null,G=M[2].split("\n"),W=M[3].split("\n"),u=M[0],d="AA",m=M[1].trim(),f=G[0].trim(),C=W[0].trim(),s=a(M[2],M[3]),v=s.departureTime,c=s.arrivalTime,ASSERT(u,d,m,f,v,C,c)&&y.push({airlineName:u,airlineCode:d,flightNumber:m,departureAirport:f,departureTime:v,arrivalAirport:C,arrivalTime:c,passengers:I})):o[$].allInnerTagsFiltered("td2").length>=2&&(M=o[$].allInnerTags("td2"),M.length>=5&&(l=""+M[1].tagContents(),valid(m)&&I[l]&&(membership=M[4].tagContents().innerCapture(regExpFormatted(/^\1:\s+(($<program>[A-Z]+)\s)?($<number>\w+)/,t.ff)),!valid(I[l].membershipNumber)&&valid(membership)&&(I[l].programName=membership.$program.result(),I[l].membershipNumber=membership.$number.result()),I[l].seats[""+m]=M[2].tagContents().innerCapture(regExpFormatted(/^\1\s*([^\s]*)/,t.seat),1),I[l].seatingType[""+m]=M[3].tagContents())));g=i.getSpan().nextRegExp(regExpFormatted(/\1/,t.reservationIdPrefix)).nextAnyTag("td").tagContents(),n()}p=i.getSpan().firstText(t.checkinPrefix).nextLink();for(var Z=[],$=0;y.length>$;$++)for(var B=y[$],R=Object.keys(B.passengers),Y=0;R.length>Y;Y++){var q=B.passengers[R[Y]],K={"@context":"http://schema.org","@type":"http://schema.org/FlightReservation",reservationFor:{"@type":"http://apple.com/FuzzyFlight",airlineName:B.airlineName,airlineCode:B.airlineCode,flightNumber:B.flightNumber,departureAirportFuzzy:B.departureAirport,departureAirportCode:F[""+B.departureAirport],departureTime:B.departureTime,arrivalAirportFuzzy:B.arrivalAirport,arrivalAirportCode:F[""+B.arrivalAirport],arrivalTime:B.arrivalTime},underName:{"@type":"http://schema.org/Person",name:q.name},checkinUrl:p,reservationId:g,reservationStatus:"http://schema.org/ReservationConfirmed",totalPrice:q.totalPrice,priceCurrency:q.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:q.ticketNumber,ticketedSeat:{"@type":"http://schema.org/Seat",seatingType:q.seatingType[B.flightNumber],seatNumber:q.seats[B.flightNumber]}}};valid(q.membershipNumber)&&(K.programMembershipUsed={"@type":"http://schema.org/ProgramMembership",membershipNumber:q.membershipNumber,programName:q.programName||"Frequent Flyer"}),Z.push(K)}return Z.length?Z:void 0}}).call();