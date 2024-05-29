// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var r=Scanner.fromMessage(e);r.setLocale(t);var a,p,s,o,g,i,d,h,m,l,x,u;if(s=r.getSpan().nextText(n.person+"\uff1a").collapseToEnd().withEnd(r.getSpan().nextText(n.person).nextText(n.name).getStart()).trim(),l=r.getSpan().innerCapture(regExpFormatted(/\1\uff1a(\w+)/,n.number),1),p=r.getSpan().innerCapture(regExpFormatted(/\1\uff1a(.+)/,n.restaurant),1).trim(),i=r.getSpan().nextText(n.phone).nextPhoneNumber().innerCapture(/([\d\s-,\.]+)/,1).trim(),d=r.getSpan().nextText(n.address).nextAddress(),a=r.getSpan().innerCapture(regExpFormatted(/\1\uff1a(.+)/,n.underName),1),x=r.getSpan().nextText(n.date),u=r.getSpan().withInterval(x.previousText("\n").getEnd(),x.nextText("\n").getStart()).allInnerDates(),u.length>0){var c,S;u=r.getSpan().withStart(u[0].getStart()).withEnd(u[u.length-1].getEnd()),c=(""+u).replace(/[^\d\sa-zA-z:]+/g," ").replace(/\s+/g," ").replace(/^(\d+)\s(\d+)\s/,"$1/$2/").trim(),S=c.lastIndexOf(" "),c=c.substr(0,S)+":"+c.substr(S+1),g=getFuzzyDate(r.getDetachedSpan(c))}return ASSERT(s,p,a)?[{"@context":"http://schema.org","@type":"http://schema.org/FoodEstablishmentReservation",partySize:s,reservationId:l,reservationStatus:"http://schema.org/ReservationCancelled",reservationFor:{"@type":"http://schema.org/FoodEstablishment",name:p,url:o,telephone:i,address:d},startTime:g,bookingAgent:{"@type":"http://schema.org/Organization",name:"Hot Pepper",url:"http://www.hotpepper.jp/"},underName:{"@type":"http://schema.org/Person",name:a},cancelReservationUrl:m,modifyReservationUrl:h}]:CONTINUE}}).call();
