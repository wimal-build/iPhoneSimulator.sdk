// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,a){if(!e||!t||!a)return CONTINUE;var r=Scanner.fromMessage(e);r.setLocale(t);var n,o,p,c,s,i,m,g,u,d,h,l,S,E,$,C,v;return n=r.getSpan().innerCapture(regExpFormatted(/\1 \w+ (.*),/,a.hello),1),p=r.getSpan().innerCapture(regExpFormatted(/\1 : ($<totalPrice>[\d\s,\.]+) ($<priceCurrency>.*)\./,a.amount)),p&&(o=p.$totalPrice,v=p.$priceCurrency),seat=r.getSpan().nextText(a.detail+" :").collapseToEnd().withEnd(r.getSpan().nextText(a.amount).getStart()).trim().innerCapture(regExpFormatted(/($<seatNumber>\d+) ($<seatRow>.*)/)),seat&&(i=seat.$seatNumber,C=seat.$seatRow),m=r.getSpan().innerCapture(regExpFormatted(/\1 .+ \/ (.*)/,a.category),1),u=r.getSpan().innerCapture(regExpFormatted(/\1 : (.*)/,a.number),1),d=r.getSpan().innerCapture(regExpFormatted(/\1 : \n\n- ($<eventName>.+)\n($<place>.+)\n($<startDate>.+)\n/,a.part)),d&&(s=d.$eventName,S=d.$place,c=d.$startDate),ASSERT(c,s)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:n,totalPrice:o,priceCurrency:v,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:i,seatRow:C,seatSection:m},ticketToken:g,ticketNumber:u},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:s,url:l,startDate:c,endDate:$,location:{"@type":"http://schema.org/Place",name:S,telephone:E,address:h}}}]:CONTINUE}}).call();