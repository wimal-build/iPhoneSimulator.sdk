// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var a=Scanner.fromMessage(e);a.setLocale(t);var r,o,g,p,i,s,x,l,u,c,d,m,T,C;return x=a.getSpan().nextText(n.manageYourBooking).parentTag("table2").innerCapture(regExpFormatted(/\1 <(.*)>/,n.manageYourBooking),1),not(x)&&n.visitMyBooking&&(x=a.getSpan().innerCapture(n.visitMyBooking,1)),l=x,s=a.getSpan().nextText(n.bookingNumber).parentTag("td3").nextTag("td3").tagContents(),g=a.getSpan().nextText(n.bookedBy).parentTag("td3").nextTag("td3").tagContents().innerCapture(/($<name>.*)\s($<email>.*@.*\..*)/g),r=g?g.$name:null,o=g?g.$email:null,u=getFuzzyDate(a.getSpan().nextText(n.yourReservation).nextRegExp(regExpFormatted(/\1/,n.checkin)).parentTag("table4")),c=getFuzzyDate(a.getSpan().nextText(n.yourReservation).nextRegExp(regExpFormatted(/\1/,n.checkout)).parentTag("table4")),g=a.getSpan().nextText(n.address).parentTag("table2").nextTag("td2").tagContents().innerCapture(/($<name>[\s\S]*) <($<url>.*)>/),m=g?g.$name:null,d=g?g.$url:null,C=a.getSpan().nextText(n.address).nextTag("td2").tagContents(),T=a.getSpan().nextText(n.phone).nextTag("td2").tagContents(),p=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.totalPrice)).nextTag("td3").tagContents().innerCapture(/([\d.,]+)/,1),i=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.cancellationFees)).parentAnyTag("table").innerCapture(regExpFormatted(/\* (?:(?:\b\1 )?.* \[.*\](?: ?\1)?\s?: )?([A-Z]{2,3})/,n.from),1),not(i)&&n.localCurrency&&(i=a.getSpan().nextText(n.localCurrency).parentTag("td3").tagContents().innerCapture(regExpFormatted(/\1 \(([a-zA-Z]{3})\)/,n.localCurrency),1)),valid(u,c,C)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:o},totalPrice:p,priceCurrency:i,checkinTime:u,checkoutTime:c,modifyReservationUrl:x,cancelReservationUrl:l,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:m,url:d,telephone:T,address:C}}]:void 0}}).call();