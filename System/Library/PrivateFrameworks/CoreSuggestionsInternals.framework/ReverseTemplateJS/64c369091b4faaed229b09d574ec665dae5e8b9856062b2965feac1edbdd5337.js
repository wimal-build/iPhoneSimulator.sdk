// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("dollar.com-reservation-plaintext-en",function(e){return/Dollar Rent A Car (?:Reservation|Cancellation) Confirmation/.test(e.subject)},function(e){if(/Dollar Rent A Car (?:Reservation|Cancellation) Confirmation/.test(e.subject)){var t=Scanner.fromMessage(e);t.setLocale("en_US");var n,a,r,o,i,p,c,s,l,m,u,C,h,g,d,f,S,v,R;if(n=t.getSpan().innerCapture(/\bName: (.*)\n/,1),a=t.getSpan().innerCapture(/\b(?:Confirmation|Cancellation) #: (.*)\n/,1),S=t.getSpan().innerCapture(/\bPickup Location: (.*)\n/,1),v=t.getSpan().innerCapture(/\bPickup Location Phone: (.*)\n/,1),h=t.getSpan().innerCapture(/\bReturn Location: (.*)\n/,1),R=t.getSpan().nextText("Pickup Date/Time:").nextDate(),d=t.getSpan().nextText("Return Date/Time:").nextDate(),s=t.getSpan().innerCapture(/\bCurrency: (.*?)\n/,1),c=t.getSpan().innerCapture(/\bTotal Estimated Charges: .*?([\d,.]+)\n/,1),l=t.getSpan().innerCapture(/\bVehicle Type: (.*)\n/,1),/^Dollar Rent A Car Cancellation Confirmation/.test(e.subject)&&(r="Cancelled"),ASSERT(n,a,l,S,R))return[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:c,priceCurrency:s,reservationStatus:"http://schema.org/Reservation"+(r||"Confirmed"),reservationId:a,checkinUrl:o,modifyReservationUrl:i,cancelReservationUrl:p,underName:{"@type":"http://schema.org/Person",name:n},provider:{"@type":"http://schema.org/Organization",name:"Dollar"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:l},license:m,color:u},pickupTime:R,pickupLocation:{"@type":"http://schema.org/Place",name:f,telephone:v,address:S},dropoffTime:d,dropoffLocation:{"@type":"http://schema.org/Place",name:C,telephone:g,address:h}}]}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/44/46","SGf0c8c9bb")]);