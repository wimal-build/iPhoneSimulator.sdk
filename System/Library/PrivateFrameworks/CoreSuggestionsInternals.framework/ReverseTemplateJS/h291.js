// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(t,e,n){if(!t||!e||!n)return CONTINUE;var a=Scanner.fromMessage(t);a.setLocale(e);var r,g,o,p,s,i,c,m,d,x,T,l,u,C,h,S;r=a.getSpan().allInnerTags("table6"),r=r[4]?r[4].innerCapture(regExpFormatted(/\1 (.*) -/,n.thanks),1):null,o=a.getSpan().nextText(n.total).nextTag("table5").innerTag("td5").tagContents(),g=o.innerCapture(regExpFormatted(/([\d\s\.,]+)/),1),p=o.innerCapture(regExpFormatted(/([^\d\s\.,]+)/),1);var E=a.getSpan().nextTag("table11").innerTag("td11").tagContents();return m=E.innerCapture(regExpFormatted(/\1 (\w*)/,n.section),1),S=E.innerCapture(regExpFormatted(/\1 (\w*)/,n.seatRow),1),c=E.innerCapture(regExpFormatted(/\1 (\w*)/,n.seatNumber),1),x=a.getSpan().nextText(n.order).parentTag("td7").tagContents().innerCapture(regExpFormatted(/\1: ([\w\/-]+)/,n.order),1),d=a.getSpan().nextText(n.print).nextLink(),i=a.getSpan().nextTag("td9").tagContents().trim(),s=a.getSpan().nextTag("table9").nextTag("table9").nextTag("table9").innerTag("td9").tagContents().innerDate(),T=a.getSpan().nextTag("table9").nextTag("table9").innerTag("td9").tagContents().trim(),ASSERT(s,i)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",name:r,totalPrice:g,priceCurrency:p,reservedTicket:{"@type":"http://schema.org/Ticket",ticketedSeat:{"@type":"http://schema.org/Seat",seatNumber:c,seatRow:S,seatSection:m},ticketToken:d,ticketNumber:x},reservationFor:{"@type":"http://schema.org/Event",eventStatus:"http://schema.org/EventConfirmed",name:i,url:l,startDate:s,endDate:h,location:{"@type":"http://schema.org/Place",name:u,telephone:C,address:T}}}]:CONTINUE}}).call();