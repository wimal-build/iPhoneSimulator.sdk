// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var r=Scanner.fromMessage(e);r.setLocale(t);var a,o,p,i,s,g,m,d,h,x,c,u;return a=r.getSpan().innerCapture(regExpFormatted(/\1 (\d+)/,n.for),1),o=r.getSpan().innerCapture(regExpFormatted(/\1 (.*)\. (\2|\3)/,n.at,n.pleased,n.reservation),1),x=r.getDetachedSpan(e.subject).innerCapture(regExpFormatted(/(\1|\2) \((.*)\)/,n.confirmed,n.resConfirmed),2),s=r.getSpan().nextText(n.phone).nextPhoneNumber(),g=r.getSpan().nextText(n.phone).previousText(o+":").collapseToEnd().withEnd(r.getSpan().nextText(n.phone).getStart()).trim(),p=getFuzzyDate(r.getSpan().innerCapture(regExpFormatted(/(\1|\2) (.*)/,n.pleased,n.reservation),2)),i=r.getSpan().innerCapture(regExpFormatted(/\1 (.*),/,n.dear),1),m=r.getSpan().nextText(n.cancel).nextLink(),c=r.getSpan().innerCapture(regExpFormatted(/\1 ([^\s]*) \2/,n.through,n.at),1),u=r.getSpan().nextText(n.new).nextLink(),ASSERT(a,o,p,i)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:a,reservationId:x,reservationStatus:"http://schema.org/ReservationConfirmed",reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:o,url:h,telephone:s,address:g},startTime:p,bookingAgent:{"@type":"http://schema.org/Organization",name:c,url:u},underName:{"@type":"http://schema.org/Person",name:i},cancelReservationUrl:m,modifyReservationUrl:d}]:CONTINUE}}).call();