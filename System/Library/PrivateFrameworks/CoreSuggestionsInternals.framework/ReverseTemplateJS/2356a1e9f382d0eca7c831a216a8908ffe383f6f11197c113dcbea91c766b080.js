// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("livenation.com-en",function(e){return/Your Live Nation/.test(e.subject)},function(e){if(/Your Live Nation/.test(e.subject)){var t=Scanner.fromMessage(e);t.setLocale("en_US");var n,a,r,s,o,i,c,p,g,u,m,d,h,S,T,x,v,C;if(int(e.epoch)>=1420070400)n=t.getSpan().innerCapture(/Thanks (.*) -/,1),u=t.getSpan().nextTag("table9").nextTag("td9"),T=u.nextTag("td9"),u=u.tagContents(),T=T.tagContents(),d=T.nextTag("td9"),c=d.nextTag("td11").tagContents().innerCapture(/Section (.*)/,1),o=d.nextText("Print now").firstLink(),C=d.nextText("Total Charges:").nextTag("td5").tagContents(),d=d.tagContents(),a=C.innerCapture(/([\d,.]+)/,1),r=C.innerCapture(/([^\d,.]+)/,1);else{s=t.getSpan().innerCapture(/Your order number for this purchase is (.*?)\./,1);var $=["PRINT YOUR TICKETS","Print my tickets"];for(var l in $)if(t.getSpan().nextText($[l]).exists()){o=t.getSpan().innerCapture(RegExp(regExpEscape($[l])+" <(.*)>"),1);break}d=t.getSpan().nextRegExp(/You purchased (.*) to:/).nextDate();var b=concatRegExp(/You purchased ($<numSeats>.*) to:(?:[\s_]+)/,/\b($<eventName>.*)\s/,/\b($<address>.*)\s/,/(?:[\s\S]+)/,/\bOrder for: ($<name>.*)\s/,/\bSeat location: section ($<section>.*?)(, row ($<row>.*?))?(, seats? ($<seat>.*?))?\s/,/\bTotal Charge: ($<priceCurrency>[A-Z]+).*?($<price>[\d,.]+)\s/);v=t.getSpan().innerCapture(b),v&&(i=v.$numSeats,u=v.$eventName,x=v.$address,n=v.$name,c=v.$section,p=v.$row,g=v.$seat,a=v.$price,r=v.$priceCurrency)}if(ASSERT(d,u))return[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:n,totalPrice:a,priceCurrency:r,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatSection:c,seatRow:p,seatNumber:g},ticketToken:o,ticketNumber:s},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:u,url:m,startDate:d,endDate:h,location:{"@type":"http://schema.org/Place",name:T,telephone:S,address:x}}}]}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/779/814/815","SGbe254d8f")]);