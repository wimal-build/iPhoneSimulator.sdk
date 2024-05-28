// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,a){if(!e||!t||!a)return CONTINUE;var n=Scanner.fromMessage(e);n.setLocale(t);var r,p,o,i,g,c,x,m,d,s,h,l,S,u,T,v,f,y,C;o=n.getSpan().nextText(a.number).nextRegExp(/\d+/),g=n.getSpan().nextText(a.modify).nextLink(),c=n.getSpan().nextText(a.cancel).nextLink(),x=n.getSpan().nextTag("table2").nextTag("table2").innerTag("td2").tagContents().innerCapture(regExpFormatted(/(\1).{0,2} \w+(.*),/,a.dear),2).trim(),d=n.getSpan().innerCapture(regExpFormatted(/\1 (.*)/,a.example),1).trim();var E=n.getSpan().nextText(a.depart).nextDate(),R=n.getSpan().nextText(a.return).nextDate(),z=n.getSpan().innerCapture(regExpFormatted(/\1($<dep>.*)\-($<ret>.*)/,a.loc));if(z&&(l=getFuzzyDate(n.getDetachedSpan(z.$dep+" "+E)),C=getFuzzyDate(n.getDetachedSpan(z.$ret+" "+R))),S=n.getSpan().nextText(a.depart),S=n.getSpan().withInterval(S.getEnd(),S.nextText("(").getStart()).trim(),u=n.getSpan().nextText(a.return),u=n.getSpan().withInterval(u.getEnd(),u.nextText("(").getStart()).trim(),ASSERT(x,l)){var D={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:r,priceCurrency:p,reservationId:o,reservationStatus:"http://schema.org/ReservationConfirmed",checkinUrl:i,modifyReservationUrl:g,cancelReservationUrl:c,underName:{"@type":"http://schema.org/Person",name:x,email:m},provider:{"@type":"http://schema.org/Organization",name:"Sixt"},pickupTime:l,pickupLocation:{"@type":"http://schema.org/Place",name:S,telephone:T,address:v},dropoffTime:C,dropoffLocation:{"@type":"http://schema.org/Place",name:u,telephone:f,address:y}};return d&&(D.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:d},license:s,color:h}),[D]}}}).call();