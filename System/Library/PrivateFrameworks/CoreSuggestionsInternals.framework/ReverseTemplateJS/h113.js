// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var a=Scanner.fromMessage(e);if(a.setLocale(t),!a.getSpan().nextTag("td1").exists())return CONTINUE;var r,g,o,p,x,d,i,s,l,m,c,T,E,C,u,A,y,h;a.getSpan().nextRegExp(n.reservationCancelled).exists()&&(i="Cancelled"),r=a.getSpan().innerCapture(regExpFormatted(/\1 (.*),/,n.name),1),g=a.getSpan().nextRegExp(regExpFormatted(/\b\1/,n.email)).nextAnyTag("td").tagContents(),d=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.reservationId)).nextAnyTag("td").tagContents(),s=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.modifyReservationUrl)).collapseToEnd().nextLink(),not(s.innerCapture(/pincode=/))&&(s=null),l=s,o=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.details)),A=o.nextRegExp(regExpFormatted(/\1/,n.hotelName)).nextAnyTag("td").tagContents();var S=o.nextText(n.address).nextTag("td1");if(S.innerTag("table2").exists()?(S=S.allInnerTagsFiltered("td2"),h=a.getDetachedSpan(S.join("\n"))):(h=getFuzzyAddress(S),(not(h)||h.getLength()<S.tagContents().getLength()-20)&&(h=S.tagContents())),y=o.nextText(n.phone).nextAnyTag("td").tagContents(),0===(""+o).length&&(A=a.getSpan().nextText(n.address).previousAnyTag("td").tagContents(),h=a.getSpan().nextText(n.address).nextAnyTag("td").tagContents(),y=a.getSpan().nextText(n.phone).nextAnyTag("td").tagContents()),m=a.getSpan().nextRegExp(regExpFormatted(/\1/,n.yourReservation)).nextRegExp(regExpFormatted(/\1/,n.checkin)).nextAnyTag("td"),c=m.allInnerDates(),T=combineDateAndTime(c[0],c[1]),E=m.nextRegExp(regExpFormatted(/\1/,n.checkout)).nextAnyTag("td").allInnerDates(),C=combineDateAndTime(E[0],E[1]),p=a.getSpan().nextRegExp(regExpFormatted(n.totalPrice)).nextAnyTag("td").tagContents().innerCapture(/([\d,.]+)/,1),not(p)&&(p=a.getSpan().nextRegExp(regExpFormatted(n.totalPriceAlternativeVersion)).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/([\d,.]+)/),1)),x=a.getSpan().nextRegExp(regExpFormatted(n.cancellationFees)).parentAnyTag("table").innerCapture(regExpFormatted(/\* (?:\b\1 .*? \[.*?\](?: ?\1)?\s?: )?([A-Z]{2,3})/,n.from),1),not(x)&&n.mealPlan&&(x=a.getSpan().nextText(n.mealPlan).parentAnyTag("td").innerCapture(regExpFormatted(/\1\s+\* .* ([A-Z]{2,3})/,n.mealPlan),1)),not(x)&&(x=a.getSpan().nextRegExp(regExpFormatted(n.totalPrice)).nextAnyTag("td").tagContents().innerCapture(/([^\d,.]+)/,1)),/When abroad or from Australia\:/.test(e.plain)){h=a.getSpan().nextText(n.address).nextAnyTag("td").tagContents(),y=a.getSpan().nextText(n.phone).nextAnyTag("td").tagContents(),A=a.getSpan().nextRegExp(n.hotelName).nextAnyTag("td").tagContents();var R=a.getSpan().nextRegExp(n.cancellationFeesAlternative).nextAnyTag("td").tagContents();if(p=R.innerCapture(/([\d,.]+)/,1),x=R.innerCapture(/([^\d,.]+)/,1),0===(""+R).length){var R=a.getSpan().nextRegExp(n.totalPriceAlternativePart1).nextAnyTag("td").tagContents().innerCapture(n.totalPriceAlternativePart2,1);p=R.innerCapture(/([\d,.]+)/,1),x=R.innerCapture(/([^\d,.]+)/,1).trim()}}return ASSERT(T,C,h)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:g},totalPrice:p,priceCurrency:x,checkinTime:T,checkoutTime:C,modifyReservationUrl:s,cancelReservationUrl:l,reservationStatus:"http://schema.org/Reservation"+(i||"Confirmed"),reservationId:d,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:A,url:u,telephone:y,address:h}}]:void 0}}).call();