// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("res.com-de",function(e){return/Reservierungsbest\xe4tigung/.test(e.subject)||/Reservierungsstornierung/.test(e.subject)},function(e){var r="de_DE",n={};n.emailTitelConfirmation=/Reservierungsbest\xe4tigung/,n.reservationId=/Reservierungsbest\xe4tigung\: (.+)/,n.checkInDate=/Anreise/,n.checkInTime=/Check-in/,n.checkOutDate=/Abreise/,n.checkOutTime=/Check-out/,n.guestName=/Sehr geehrte\(r\) (.+)\,/,n.modifyUrl=/\xc4nderungen an der Reservierung vornehmen/,n.cancelUrl=/Ihre Buchung stornieren/,n.price=/Gesamtkosten f\xfcr den Aufenthalt/,n.hotelInfo=/Bitte pr\xfcfen Sie die Details Ihrer Reservierung|Wir haben Ihre Reservierung storniert/,n.emailTitelCancelConfirmation=/Reservierungsstornierung/,n.cancelReservationId=/Reservierung storniert[^.]/,n.cancelPrice=/Preisinformationen/;var t=loadHelper("res.com.js");return t(e,r,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/476/484","SGb369469d"),new ReverseTemplate("res.com-en",function(e){return/Reservation Confirmation/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var r="en_AU",n={};n.emailTitelConfirmation=/Reservation Confirmation/,n.reservationId=/Reservation Confirmation\: (.+)/,n.checkInDate=/CHECK-IN DATE/,n.checkInTime=/CHECK-IN TIME/,n.checkOutDate=/CHECK-OUT DATE/,n.checkOutTime=/CHECK-OUT TIME/,n.guestName=/(?:Dear (.+)\,|Hello (.+))/,n.modifyUrl=/Modify your reservation/,n.cancelUrl=/Cancel your reservation/,n.price=/Total for stay/,n.hotelInfo=/Please review your reservation details|We have canceled your reservation/,n.emailTitelCancelConfirmation=/Reservation Cancellation/,n.cancelReservationId=/RESERVATION CANCELLED/,n.cancelPrice=/Rate Information/;var t=loadHelper("res.com.js");return t(e,r,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/476/485","SGe95f4d42"),new ReverseTemplate("res.com-jp",function(e){return/\u4e88\u7d04\u306e\u30ad\u30e3\u30f3\u30bb\u30eb/.test(e.subject)||/\u4e88\u7d04\u306e\u78ba\u8a8d/.test(e.subject)},function(e){var r="ja_JP",n={};n.emailTitelConfirmation=/\u4e88\u7d04\u306e\u78ba\u8a8d/,n.reservationId=/\u3054\u4e88\u7d04\u306e\u78ba\u8a8d\uff1a\s+(.+)/,n.checkInDate=/\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u65e5/,n.checkInTime=/\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u6642\u523b/,n.checkOutDate=/\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u65e5/,n.checkOutTime=/\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u6642\u523b/,n.guestName=/(.+)\s+\u69d8/,n.modifyUrl=/\u3054\u4e88\u7d04\u306e\u5909\u66f4/,n.cancelUrl=/\u3054\u4e88\u7d04\u306e\u30ad\u30e3\u30f3\u30bb\u30eb/,n.price=/\u5bbf\u6cca\u306e\u5408\u8a08\u30dd\u30a4\u30f3\u30c8/,n.hotelInfo=/\u3054\u4e88\u7d04\u306e\u8a73\u7d30|\u304a\u5ba2\u69d8\u306e\u3054\u6ede\u5728\u3092\u30ad\u30e3\u30f3\u30bb\u30eb\u3057\u307e\u3057\u305f/,n.emailTitelCancelConfirmation=/\u4e88\u7d04\u306e\u30ad\u30e3\u30f3\u30bb\u30eb/,n.cancelReservationId=/\u30ad\u30e3\u30f3\u30bb\u30eb\u6e08\u307f\u306e\u3054\u4e88\u7d04/,n.cancelPrice=/\u6599\u91d1\u60c5\u5831/;var t=loadHelper("res.com.js");return t(e,r,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/476/486","SG22c69320")]);