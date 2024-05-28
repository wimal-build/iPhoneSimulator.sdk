// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,p,i,g,s,x,o,d,c,l,m,u,S,h,C,f,T,v,E,y,R,I,$,N,P,k,A;if("1"===n.version){if(g=a.getSpan().innerCapture(RegExp("\\b"+regExpEscape(n.reservationIdPrefix)+" (\\w+)\\s"),1),not(g)&&(g=a.getSpan().nextText(n.reservationIdPrefix).nextAnyTag("td").tagContents()),k=a.getSpan().nextText(n.pickupInformationHeader).nextText("\n"),k=a.getSpan().withInterval(k.getEnd(),k.nextText("\n").getStart()),A=getFuzzyDate(a.getDetachedSpan((""+k).replace(/,(\D+) (\d+),/," $2 $1 "))),P=k.nextPhoneNumber(),I=a.getSpan().withInterval(k.getEnd(),P.getStart()).trim().innerCapture(/^($<name>.*)\s(.*?\s)?($<address>.*(?:\s\(\d{5} \))?)$/),$=I?I.$name:null,N=I?I.$address:null,!N){var I=a.getSpan().nextText(n.pickupInformationHeader).parentAnyTag("td").tagContents();I=(""+I).split("\n"),N=""+I.slice(2,3)}if(R=a.getSpan().nextText(n.pickupInformationHeader).nextRegExp(n.returnDateRegExp).nextText("\n"),R=a.getSpan().withInterval(R.getEnd(),R.nextText("\n").getStart()),c=getFuzzyDate(a.getDetachedSpan((""+R).replace(/,(\D+) (\d+),/," $2 $1 "))),y=R.nextPhoneNumber(),T=a.getSpan().withInterval(R.getEnd(),y.getStart()).trim().innerCapture(/^($<name>.*)\s(.*?\s)?($<address>.*(?:\s\(\d{5} \))?)$/),v=T?T.$name:null,E=T?T.$address:null,!E){var T=a.getSpan().nextText(n.returnText).parentAnyTag("td").tagContents();T=(""+T).split("\n"),E=""+T.slice(2,3)}a.getSpan().nextText(n.cancellationHeader).exists()?(s="Cancelled",r=a.getSpan().innerCapture(RegExp("\\s(.*)"+regExpEscape(n.firstNameSuffix)),1).trim()):r=a.getSpan().nextText(n.firstNamePrefix).nextAnyTag("td").tagContents(),p=a.getSpan().nextRegExp(RegExp(n.emailAddressPrefix,"i")).nextAnyTag("td").tagContents(),l=a.getSpan().nextRegExp(RegExp(regExpEscape(n.pricingPrefix)+"(?:\\s+\\(.*?\\))?")),m=l.nextTag("td7").tagContents().innerCapture(/([\d,.]+)/,1),u=l.innerCapture(/\((.*?)\)/,1),not(u)&&(u=l.nextTag("td7").tagContents().innerCapture(/[\d,.]+\s+([A-Z]{3})/,1)),f=a.getSpan().nextText("add-to-email-calendar-from-mail.ac").parentAnyTag("td"),4===f.allInnerLinks().length&&(o=f.nextLink().nextLink(),d=o.nextLink()),S=a.getSpan().nextText(n.carPrefix).nextAnyTag("table"),i=S.getTagNumber(),S=S.allInnerTagsFiltered("td"+i),S.length>2&&(S=S[1].tagContents())}if("2"===n.version){if(n.cancellation.test(a.getSpan().tagContents()))return CONTINUE;r=a.getSpan().innerCapture(n.guestName,1),p=a.getSpan().nextRegExp(n.guestName).nextLink(),g=a.getSpan().innerCapture(n.reservationId,1);var D=a.getSpan().innerCapture(n.price,1);m=D.innerCapture(/([\d,.]+)/,1),u=D.innerCapture(/([^\d,.]+)/,1).trim(),A=a.getSpan().nextRegExp(n.dates).nextDate(),c=a.getSpan().nextRegExp(n.dates).nextDate().nextDate(),P=y=a.getSpan().nextRegExp(n.dates).nextPhoneNumber(),N=E=a.getSpan().innerCapture(n.address,1);var S=a.getSpan().innerCapture(n.brand,1);s="Confirmed"}if(!ASSERT(g,r,N,A,E,c))return CONTINUE;var b={"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:m,priceCurrency:u,reservationId:g,reservationStatus:"http://schema.org/Reservation"+(s||"Confirmed"),checkinUrl:x,modifyReservationUrl:o,cancelReservationUrl:d,underName:{"@type":"http://schema.org/Person",name:r,email:p},provider:{"@type":"http://schema.org/Organization",name:"Avis"},pickupTime:A,pickupLocation:{"@type":"http://schema.org/Place",name:$,telephone:P,address:N},dropoffTime:c,dropoffLocation:{"@type":"http://schema.org/Place",name:v,telephone:y,address:E}};return S&&(b.reservationFor={"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:S},license:h,color:C}),[b]}}).call();