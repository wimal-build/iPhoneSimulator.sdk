// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(t,e,n,a){if(!(t&&e&&n&&a))return CONTINUE;var r=Scanner.fromMessage(t);r.setLocale(e);var o,s,g,i,p,x,d,m,T,h,c;return g=r.getSpan().nextText(n.person).parentTag("td7").tagContents().innerCapture(regExpFormatted(/(\d+)/),1),h=r.getSpan().nextText(n.id),h.parentTag("table5").exists()||(h=h.nextText(n.id)),h=h.parentTag("table5").lastInnerTag("td5").tagContents(),s=r.getSpan().nextTag("table7").innerTag("td7").tagContents(),i=r.getSpan().nextText(n.website).nextLink(),x=r.getSpan().nextText(n.phone+":"),x=r.getSpan().withInterval(x.getEnd(),x.nextClosingTag("td7").getStart()).trim(),d=r.getSpan().nextText(n.address).nextAddress(),c=r.getSpan().nextText(n.date).nextDate(),p=r.getDetachedSpan(c+" "+c.nextDate()),o=r.getSpan().nextText(n.name).parentTag("td7").tagContents().innerCapture(regExpFormatted(/:(.*)/),1).trim(),T=r.getSpan().nextText(n.cancel).nextLink(),ASSERT(s,p,o)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:g,reservationId:h,reservationStatus:"http://schema.org/Reservation"+a,reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:s,url:i,telephone:x,address:d},startTime:p,bookingAgent:{"@type":"http://schema.org/Organization",name:"Dimmi",url:"http://www.dimmi.com.au"},underName:{"@type":"http://schema.org/Person",name:o},cancelReservationUrl:T,modifyReservationUrl:m}]:CONTINUE}}).call();