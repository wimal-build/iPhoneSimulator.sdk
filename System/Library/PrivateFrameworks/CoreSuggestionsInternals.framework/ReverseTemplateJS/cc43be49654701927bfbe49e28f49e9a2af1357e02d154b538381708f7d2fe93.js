// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("ihg.com-de",function(e){return/Ihre Reservierungsbest\xe4tigung bei|\xc4nderung Ihrer Reservierung bei/.test(e.subject)||/Stornierung Ihrer Reservierung bei/.test(e.subject)},function(e){var t="de_DE",n={};n.emailTitelConfirmation=/Ihre Reservierungsbest\xe4tigung bei|\xc4nderung Ihrer Reservierung bei/,n.reservationId=/(?:Ihre neue Best\xe4tigung ist|Ihre Best\xe4tigungsnummer ist) ([\w\d]+)/,n.checkInDate=/Check-in\:/,n.checkOutDate=/Check-out\:/,n.guestName=/Name des Gastes\:/,n.price=/Gesch\xe4tzter Gesamtpreis\:/,n.modifyUrl=/Reservierung \xe4ndern/,n.cancelUrl=/Reservierung stornieren/,n.hotelInfo=/Stornierungsbedingungen\:/,n.hotelPhone=/Rezeption/,n.emailTitelCancelConfirmation=/Stornierung Ihrer Reservierung bei/;var i=loadHelper("ihg.com.js");return i(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/452/454","SG5cddae88"),new ReverseTemplate("ihg.com-en",function(e){return/Reservation Confirmation/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){if(/Reservation Confirmation/.test(e.subject)||/Reservation Cancellation/.test(e.subject)){var t,n="en_US",i={};return i.emailTitelConfirmation=/Reservation Confirmation/,i.reservationId=/Confirmation Number\s*(?:is)?\s*(?:[:|#] )?([\w\d]+)/i,i.cancellationId=/Cancellation number:\s+([\w\d]+)/i,i.checkInDate=/Check-In\:/,i.checkOutDate=/Check-Out\:/,i.guestName=/(?:Guest )?Name\:/,i.price=/Estimated Total Price\:/,i.modifyUrl=/MODIFY RESERVATION/,i.cancelUrl=/CANCEL RESERVATION/,i.hotelInfo=/Cancellation Policy\:/,i.hotelPhone=/Front Desk/,i.hotelName=/(?:Greetings from .+\n|Welcome to )([\w\s]+)/,i.addressLabel="View Map / Get Driving Directions",i.emailTitelCancelConfirmation=/Reservation Cancellation/,int(e.epoch)<1420070400?(t=loadHelper("ihg.com.js"))(e,n,i):(t=loadHelper("ihg.com-2015-skeleton.js"))(e,n,i)}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/452/455","SG44813870"),new ReverseTemplate("ihg.com-fr",function(e){return/Votre r\xe9servation|Votre modification de r\xe9servation/.test(e.subject)||/Annulation de r\xe9servation/.test(e.subject)},function(e){var t="fr_FR",n={};n.emailTitelConfirmation=/Votre r\xe9servation|Votre modification de r\xe9servation/,n.reservationId=/confirmation est l[ea] (?:# )?([\w\d]+)/,n.checkInDate=/Arriv\xe9e \:/,n.checkOutDate=/D\xe9part \:/,n.guestName=/Nom du client \:/,n.price=/Prix total estimatif \:/,n.modifyUrl=/Modifier une r\xe9servation/,n.cancelUrl=/Annuler la r\xe9servation/,n.hotelInfo=/Politique d'annulation \:/,n.hotelPhone=/R\xe9ception/,n.hotelName=/(?:Greetings from .+\n|Welcome to )([\w\s]+)/,n.emailTitelCancelConfirmation=/Annulation de r\xe9servation/;var i=loadHelper("ihg.com.js");return i(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/452/456","SGe9c9d101")]);