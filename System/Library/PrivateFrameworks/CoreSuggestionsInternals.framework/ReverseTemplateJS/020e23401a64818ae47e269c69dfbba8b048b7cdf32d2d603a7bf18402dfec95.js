// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("ticketweb.com-ticket-delivery-en",function(e){return/Your (.*?) tickets have arrived!/.test(e.subject)},function(e){if(/Your (.*?) tickets have arrived!/.test(e.subject)){var a=Scanner.fromMessage(e);a.setLocale("en_US");var r,s,n,c,o=[];if(r={},r.name=a.getSpan().innerCapture(/Thank you, (.*?),/,1),r.ticketNumber=a.getSpan().innerCapture(/Your Order Number is (.*)/,1),r.address=a.getSpan().nextText("You purchased").nextAddress(),r.startDate=r.address.nextDate(),c=concatRegExp(/You purchased ($<numSeats>\d+) ticket\(s\) to:\s+/,/\*+\s+/,/\b($<eventName>.*)\s+/,/\b($<place>.*)\s+/,/\b($<address>.*)\s+/),n=a.getSpan().innerCapture(c),n&&(r.numSeats=n.$numSeats,r.eventName=n.$eventName,r.place=n.$place,s=a.getAddressDD(r.address),s&&(""+n.$address).length>s.text.length&&(r.address=n.$address)),ASSERT(r.eventName,r.startDate)&&o.push(r),o.length){for(var d=[],i=0;t=o[i++];)d.push({"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:t.name,totalPrice:t.price,priceCurrency:t.priceCurrency,reservedTicket:{"@type":"http://schema.org/Ticket",ticketNumber:t.ticketNumber,ticketToken:t.ticketDownloadUrl,ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:t.seat,seatRow:t.seatRow,seatSection:t.seatSection}},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:t.eventName,url:t.eventUrl,startDate:t.startDate,endDate:t.endDate,location:{"@type":"http://schema.org/Place",name:t.place,telephone:t.phoneNumber,address:t.address}}});return d}}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/779/847/849","SG9881e3be")]);