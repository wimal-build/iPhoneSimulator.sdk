// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("res.com-de",function(e){return/Reservierungsbest\xe4tigung/.test(e.subject)||/Reservierungsstornierung/.test(e.subject)},function(e){var r="de_DE",n={};n.emailTitelConfirmation=/Reservierungsbest\xe4tigung/,n.reservationId=/Reservierungsbest\xe4tigung\: (.+)/,n.checkInDate=/Anreise/,n.checkInTime=/Check-in/,n.checkOutDate=/Abreise/,n.checkOutTime=/Check-out/,n.guestName=/Sehr geehrte\(r\) (.+)\,/,n.modifyUrl=/\xc4nderungen an der Reservierung vornehmen/,n.cancelUrl=/Ihre Buchung stornieren/,n.price=/Gesamtkosten f\xfcr den Aufenthalt/,n.hotelInfo=/Bitte pr\xfcfen Sie die Details Ihrer Reservierung|Wir haben Ihre Reservierung storniert/,n.emailTitelCancelConfirmation=/Reservierungsstornierung/,n.cancelReservationId=/Reservierung storniert[^.]/,n.cancelPrice=/Preisinformationen/;var t=loadHelper("res.com.js");return t(e,r,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/476/484","SGb369469d"),new ReverseTemplate("res.com-en",function(e){return/Reservation Confirmation/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var r="en_AU",n={};n.emailTitelConfirmation=/Reservation Confirmation/,n.reservationId=/Reservation Confirmation\: (.+)/,n.checkInDate=/CHECK-IN DATE/,n.checkInTime=/CHECK-IN TIME/,n.checkOutDate=/CHECK-OUT DATE/,n.checkOutTime=/CHECK-OUT TIME/,n.guestName=/(?:Dear (.+)\,|Hello (.+))/,n.modifyUrl=/Modify your reservation/,n.cancelUrl=/Cancel your reservation/,n.price=/Total for stay/,n.hotelInfo=/Please review your reservation details|We have canceled your reservation/,n.emailTitelCancelConfirmation=/Reservation Cancellation/,n.cancelReservationId=/RESERVATION CANCELLED/,n.cancelPrice=/Rate Information/;var t=loadHelper("res.com.js");return t(e,r,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/476/485","SGe95f4d42")]);