// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("fandango.com-confirmation-en",function(e){return/^Fandango Purchase Confirmation - Please Read$/.test(e.subject)},function(e){var t=Scanner.fromMessage(e);t.setLocale("en_US");var n,a,r,o,i,s,g,c,p,m,d,h,T,x,u;m=t.getSpan().nextText("Showtime & Theater Details").nextAnyTag("table"),s=m.innerRegExp(/Movie ?:/).nextAnyTag("td").tagContents(),c=m.innerRegExp(/Date ?:/).nextAnyTag("td").innerDate(),p=m.innerRegExp(/Time ?:/).nextAnyTag("td").innerDate(),h=combineDateAndTime(c,p),i=m.innerText("Quantity:").nextAnyTag("td").tagContents(),d=t.getDetachedSpan(""+m.innerText("Where:").nextAnyTag("td").tagContents()),u=getFuzzyAddress(d),x=d.nextPhoneNumber(),m=t.getSpan().innerText("Where:").nextAnyTag("td").tagContents().innerCapture(/\b($<place>.*)\s($<address>[^]+)\nPhone/);var y=m?m.$place:null;return u=m&&not(u)?m.$address.trim():u,r=t.getSpan().nextText("Confirmation Number").nextAnyTag("td").tagContents(),o=t.getSpan().innerCapture(/\bView your ticket confirmation page:(?:.*)<(.*)>/,1),n=t.getSpan().nextText("Total Order Amount").nextAnyTag("td").tagContents().innerCapture(/([\d,.]+)/,1),ASSERT(h,s)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",totalPrice:n,priceCurrency:a,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:i},ticketToken:o,ticketNumber:r},reservationFor:{"@type":"http://schema.org/MovieShowing",eventStatus:"http://schema.org/EventConfirmed",url:g,startDate:h,endDate:T,movie:{"@type":"http://schema.org/Movie",name:s},location:{"@type":"http://schema.org/Place",name:y,telephone:x,address:u}}}]:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/779/806/807","SGf9482349")]);