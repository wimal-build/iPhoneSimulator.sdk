// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,o,i,s,x,p,d,g,c,m,T,h,f,l=a.getSpan(),y="Cancelled";o=l.innerCapture(regExpFormatted(/\1\s?(\D\d+)/,n.reservationIdPrefix),1),i=l.nextText(n.carBrandPrefix).nextAnyTag("td").tagContents();var C=l.nextText(n.pickUpBlockHeader);d=C.nextText(n.dateTimePrefix).nextAnyTag("td").tagContents().innerDate(),p=C.nextText(n.addressPrefix).nextAnyTag("td").tagContents().innerCapture(/(.+)\n/,1),x=C.nextText(n.telephonePrefix).nextAnyTag("td").tagContents();var v=l.nextText(n.dropOffBlockHeader);return T=v.nextText(n.dateTimePrefix).nextAnyTag("td").tagContents().innerDate(),m=v.nextText(n.addressPrefix).nextAnyTag("td").tagContents().innerCapture(/(.+)\n/,1),c=v.nextText(n.telephonePrefix).nextAnyTag("td").tagContents(),h=f=l.nextText(n.modifyReservationUrl).nextLink(),r=a.getSpan().next(n.underPersonNamePrefix).parentAnyTag("td").tagContents().innerCapture(regExpFormatted(/\1\s+(.*)/,n.underPersonNamePrefix),1),ASSERT(o,p,d)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationStatus:"http://schema.org/Reservation"+y,reservationId:o,modifyReservationUrl:h,cancelReservationUrl:f,underName:{"@type":"http://schema.org/Person",name:r},provider:{"@type":"http://schema.org/Organization",name:"Dollar Rent A Car"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:i}},pickupTime:d,pickupLocation:{"@type":"http://schema.org/Place",name:s,telephone:x,address:p},dropoffTime:T,dropoffLocation:{"@type":"http://schema.org/Place",name:g,telephone:c,address:m}}]:void 0}}).call();
