// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(t){if(startsWith(t.subject,"Please complete your sale")||startsWith(t.subject,"Your StubHub sale is cancelled")||startsWith(t.subject,"Charge Applied")||startsWith(t.subject,"Tickets sold"))return CONTINUE;if(startsWith(t.subject,"Create your new StubHub password"))return CONTINUE;if(startsWith(t.subject,"Refund Applied"))return CONTINUE;var e=Scanner.fromMessage(t);e.setLocale("en_US");var a,s,r,n,c,i,o,u,p,h,l,g,b,d,m,S,v;s=e.getSpan().innerCapture(/\bHi (\w+),\s/,1),c=e.getSpan().innerCapture(/\bOrder #: ([\d]+)/,1),i=e.getSpan().innerCapture(/\bbelow to print your tickets\.\s+<(.*)>/,1),i.exists()||(i=e.getDetachedSpan("http://www.StubHub.com")),b=e.getSpan().nextText("Event time subject to change - Check local listings").previousDate();var C=e.getSpan().innerCapture(/\b(.+)\sat\s(.+?)\n(?:.+?)\n\(Event time subject to change/);C&&3===C.length&&(l=C[1],v=C[2]);var E=RegExp("\\(Event time subject to change - Check local listings\\)\\s+\\b($<seatSection>.*) \\| ($<numSeats>.*)\\s+(?:(?:Row )?($<seatRow>.*) \\| (?:Seats? )?($<seat>.*)\\s)?"),j=e.getSpan().innerCapture(E);return j&&(h=j.$seatSection,o=j.$numSeats,p=j.$seatRow,u=j.$seat),r=e.getSpan().nextText("Order total:").nextTag("td2").tagContents().innerCapture(/([\d,.]+)/,1),a="http://schema.org/EventConfirmed",startsWith(t.subject,"Event cancelled")||startsWith(t.subject,"Account Credit Applied")?a="http://schema.org/EventCancelled":(startsWith(t.subject,"Order Placed")||startsWith(t.subject,"Your tickets have shipped"))&&(a="http://schema.org/EventConfirmed"),ASSERT(b,l)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:s,totalPrice:r,priceCurrency:n,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:c,ticketToken:i,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:u,seatRow:p,seatSection:h}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:a,name:l,url:g,startDate:b,endDate:d,location:{"@type":"http://schema.org/Place",name:S,telephone:m,address:v}}}]:void 0}}).call();
