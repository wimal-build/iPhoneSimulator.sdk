// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("relaischateaux-en",function(e){return/Reservation Confirmation/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var a="en_US",r={};r.emailTitelConfirmation=/Reservation Confirmation/,r.reservationId=/Your confirmation number is\:\s(.+)/,r.checkInDate=/Arrival Date\:/,r.checkOutDate=/Departure Date\:/,r.guestName=/[Yy]our reservation at (.+) for (.+?)(?:\,|\.\n)/,r.price=/(?:Total Stay|Room Rate)\:\s(.+)/,r.hotelAddress=/Click here to receive your access map by e-mail.+/,r.hotelAddressRegexCapture=/Click here to receive your access map by e-mail .+\n\n.+\n([\s\S]*)/,r.cancelUrl=/Should you need to cancel your reservation/,r.emailTitelCancelConfirmation=/Reservation Cancellation/,r.cancelReservationId=/confirmation number (.+) has been cancelled/;var t=loadHelper("relaischateaux.js");return t(e,a,r)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/504/505","SG71ff2a3b"),new ReverseTemplate("relaischateaux-fr",function(e){return/Confirmation de r\xe9servation/.test(e.subject)||/Confirmation d'annulation/.test(e.subject)},function(e){var a="fr_FR",r={};r.emailTitelConfirmation=/Confirmation de r\xe9servation/,r.reservationId=/Votre num\xe9ro de confirmation est \:\s(.+)/,r.checkInDate=/Date d'arriv\xe9e \:/,r.checkOutDate=/Date de d\xe9part \:/,r.guestName=/l'\xe9tablissement (.+) pour (.+?)[,.]/,r.price=/(?:Total du s\xe9jour|Tarif de la chambre) \:\s(.+)/,r.hotelAddress=/Cliquez ici pour recevoir votre plan d'acc\xe8s par e-mail.+/,r.hotelAddressRegexCapture=/Cliquez ici pour recevoir votre plan d'acc\xe8s par e-mail.+\n\n.+\n([\s\S]*)/,r.cancelUrl=/Si vous souhaitez annuler votre r\xe9servation/,r.emailTitelCancelConfirmation=/Confirmation d'annulation/,r.cancelReservationId=/le num\xe9ro de confirmation \xe9tait (.+) est \xe0 pr\xe9sent annul\xe9e/;var t=loadHelper("relaischateaux.js");return t(e,a,r)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/504/506","SG4f2ac3e2")]);