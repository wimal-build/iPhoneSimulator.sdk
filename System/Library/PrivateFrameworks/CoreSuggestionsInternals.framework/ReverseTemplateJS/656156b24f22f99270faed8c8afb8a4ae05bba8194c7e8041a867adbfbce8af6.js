// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("steigenberger",function(e){return/Ihre Best\xe4tigung/.test(e.subject)||/Ihre Stornierungsbest\xe4tigung/.test(e.subject)},function(e){var t="de_DE",r={};r.emailTitelConfirmation=/Ihre Best\xe4tigung/,r.reservationId=/Ihre Best\xe4tigungsnummer\n(.+)/,r.checkInDate=/Anreisedatum\:/,r.checkOutDate=/Abreisedatum\:/,r.guestName=/Name\:/,r.price=/Gesamtpreis\:/,r.hotelInfo=/Impressum/,r.emailTitelCancellation=/Ihre Stornierungsbest\xe4tigung/;var n=loadHelper("steigenberger.js");return n(e,t,r)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/533/534","SGf32552ef")]);