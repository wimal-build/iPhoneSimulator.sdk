// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n,r){if(!(e&&t&&n&&r))return CONTINUE;var a=loadHelper("opentable.com-microdata-parser.js"),o=a(e);if(o)return o;var i=Scanner.fromMessage(e);i.setLocale(t);var s,p,g,d,m,l,h,x,c,u,S,E,v,T;return s=i.getSpan().innerCapture(regExpFormatted(/\1.*\n(.*?)(\2)?\n/m,n.infos,n.hello),1).trim(),p=i.getSpan().innerCapture(regExpFormatted(/\1(:|\uff1a) (\d+)/,n.number),2),u=i.getSpan().nextText(n.address+":").collapseToEnd().withEnd(i.getSpan().nextText(n.description).getStart()).trim(),c=not(u.innerAddress())?u.innerCapture(/^.*\r?\n(.*)/,1):u.innerAddress(),x=not(u.innerPhoneNumber())?u.innerCapture(/(\d{11})/,1):u.innerPhoneNumber(),g=i.getDetachedSpan(e.subject).innerCapture(regExpFormatted(/(?:\1|\2) (.*)/,n.reservation,n.reservationAlt),1),g.exists()||(g=i.getDetachedSpan(e.subject).innerCapture(regExpFormatted(/(.*)(\1|\2)/,n.reservation,n.reservationAlt),1).trim()),m=i.getSpan().nextRegExp(n.infos).nextText(n.person),d=i.getSpan().withStart(m.previousText("\n").getEnd()).withEnd(m.nextText("\n").getStart()).innerCapture(regExpFormatted(/(\d+)/),1),v=i.getSpan().nextRegExp(n.infos).collapseToEnd().withEnd(i.getSpan().nextRegExp(n.infos).nextText(n.number).getStart()).trim(),T=v.allInnerDates(),T.length>0&&(T=i.getSpan().withStart(T[0].getStart()).withEnd(T[T.length-1].getEnd()),h=getFuzzyDate(i.getDetachedSpan((""+T).replace(/[^\d\sa-zA-z:]+/g,"").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/")))),S=i.getSpan().nextText(n.modify).nextLink(),E=i.getSpan().nextText(n.cancel).nextLink(),ASSERT(d,g,h,s)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:d,reservationId:p,reservationStatus:"http://schema.org/ReservationConfirmed",reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:g,url:l,telephone:x,address:c},startTime:h,bookingAgent:{"@type":"http://schema.org/Organization",name:"OpenTable",url:"http://www."+r+"/"},underName:{"@type":"http://schema.org/Person",name:s},modifyReservationUrl:S,cancelReservationUrl:E}]:CONTINUE}}).call();