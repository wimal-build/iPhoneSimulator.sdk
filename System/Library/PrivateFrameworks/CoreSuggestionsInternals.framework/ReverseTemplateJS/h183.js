// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,g,o,i,c,p,s,d,h,m,x,l,u,y,T,A,S,C,v;h=a.getSpan().next(n.checkin).nextDate(),C=a.getSpan().next(n.checkin).parentAnyTag("td").nextAnyTag("td").tagContents().innerCapture(regExpFormatted(n.checkinTime),1);var k=(C+"").length-2;return d=(C+"").slice(0,k)+":"+(C+"").slice(k),l=a.getSpan().next(n.checkout).nextDate(),v=a.getSpan().next(n.checkout).parentAnyTag("td").nextAnyTag("td").tagContents().innerCapture(regExpFormatted(n.checkoutTime),1),k=(v+"").length-2,x=(v+"").slice(0,k)+":"+(v+"").slice(k),m=a.getDetachedSpan(""+h+" "+d).innerDate(),u=a.getDetachedSpan(""+l+" "+x).innerDate(),p=a.getSpan().next(n.confirmation).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(n.confirmation),1),o=a.getSpan().next(n.totalPrice).parentAnyTag("td").nextAnyTag("td").tagContents(),i=o.innerCapture(/([\d,.]+)/,1),c=o.innerCapture(/([^\d,.]+)/,1).trim(),r=a.getSpan().next(n.guestName).parentAnyTag("td").nextAnyTag("td").tagContents(),g=a.getSpan().next(n.guestEmail).parentAnyTag("td").nextAnyTag("td").tagContents(),y=a.getSpan().next(n.hotelName).parentAnyTag("td").nextAnyTag("td").tagContents(),A=a.getSpan().next(n.bookingDetails).nextAddress(),T=a.getSpan().next(n.hotelPhone).parentAnyTag("td").nextAnyTag("td").tagContents(),ASSERT(r,m,u,A)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:g},totalPrice:i,priceCurrency:c,checkinTime:m,checkoutTime:u,modifyReservationUrl:S,reservationStatus:"http://schema.org/Reservation"+(s||"Confirmed"),reservationId:p,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:y,url:null,telephone:T,address:A}}]:void 0}}).call();