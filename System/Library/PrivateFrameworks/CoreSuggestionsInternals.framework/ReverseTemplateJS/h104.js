// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,g,o,s,p,l,d,c,x,u,T,m,C,h,S,v,R,b;if(!n.emailTitelConfirmation.test(e.subject)&&!n.emailTitelCancelConfirmation.test(e.subject)||!a.getSpan().nextRegExp(n.reservationName).exists())return CONTINUE;r=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.reservationName)).nextAnyTag("td").tagContents(),p=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.reservationId)).nextAnyTag("td").tagContents(),g=r.nextTag("table2").nextTag("table2"),T=g.nextTag("td2").nextTag("td2").nextTag("td2").tagContents().innerCapture(/($<name>.+)\s<($<url>.+)>/),C=T?T.$name:null,m=T?T.$url:null,valid(C)&&(h=C.nextTag("td2").nextTag("td2").nextTag("td2").nextTag("td2").tagContents(),S=h.nextTag("td2").nextTag("td2").nextTag("td2").nextTag("td2").tagContents(),v=h.nextTag("td2").tagContents().innerCapture(/GPS :(N|S)\s($<latitude>.+)(W|E)\s($<longitude>.+)/));a.getSpan().nextRegExp(n.dates).parentAnyTag("td").tagContents().allInnerDates();return c=a.getDetachedSpan(""+a.getSpan().innerCapture(n.dates,1)).innerDate(),u=a.getDetachedSpan(""+a.getSpan().innerCapture(n.dates,2)).innerDate(),n.emailTitelConfirmation.test(e.subject)&&(b=R=a.getSpan().nextText(n.yourReservation).parentTag("table2").nextTag("table2").nextTag("table2").tagContents().innerLink(),d=a.getSpan().nextRegExp(n.checkInPolicy).nextTag("td2").innerDate(),x=a.getSpan().nextRegExp(n.checkOutPolicy).nextTag("td2").innerDate(),c=combineDateAndTime(c,d),u=combineDateAndTime(u,x),o=a.getSpan().nextRegExp(n.price).parentTag("table2").tagContents().innerCapture(n.price,1).innerCapture(/([\d,.]+)/,1),s=a.getSpan().nextRegExp(n.price).parentTag("table2").tagContents().innerCapture(n.price,1).innerCapture(/([^\d,.]+)/,1).trim()),n.emailTitelCancelConfirmation.test(e.subject)&&(l="Cancelled"),ASSERT(r,C,S,c,u)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:o,priceCurrency:s,checkinTime:c,checkoutTime:u,modifyReservationUrl:R,cancelReservationUrl:b,reservationStatus:"http://schema.org/Reservation"+(l||"Confirmed"),reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:C,url:m,telephone:h,geo:valid(v)?{"@type":"http://schema.org/GeoCoordinates",latitude:v.$latitude,longitude:v.$longitude}:null,address:S}}]:void 0}}).call();