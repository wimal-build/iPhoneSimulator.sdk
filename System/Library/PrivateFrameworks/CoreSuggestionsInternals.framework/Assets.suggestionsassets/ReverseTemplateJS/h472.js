// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);if(a.setLocale(t),!a.getSpan().nextRegExp(n.cancellationMessage).exists())return CONTINUE;var r=a.getSpan().innerCapture(regExpFormatted(/\1 ([^,]+),/,n.guestNamePrefix),1).trim(),i=a.getSpan().nextText(n.hotelNamePrefix).nextAnyTag("td").tagContents().trim(),s=a.getSpan().nextText(n.reservationIdPrefix).nextAnyTag("td").tagContents().trim(),g=a.getSpan().nextText(n.guestEmailAddressPrefix).nextAnyTag("td").tagContents().trim(),o=g.nextText(n.hotelAddressPrefix).nextAnyTag("td").tagContents().trim(),x=a.getSpan().nextText(n.hotelTelephonePrefix).nextAnyTag("td").tagContents().trim(),c=a.getSpan().nextText(n.checkInDatePrefix).nextAnyTag("td").innerDate(),m=a.getSpan().nextText(n.checkOutDatePrefix).nextAnyTag("td").innerDate();return ASSERT(i,c,m)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:g},checkinTime:c,checkoutTime:m,reservationStatus:"http://schema.org/ReservationCancelled",reservationId:s,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:i,telephone:x,address:o}}]:void 0}}).call();
