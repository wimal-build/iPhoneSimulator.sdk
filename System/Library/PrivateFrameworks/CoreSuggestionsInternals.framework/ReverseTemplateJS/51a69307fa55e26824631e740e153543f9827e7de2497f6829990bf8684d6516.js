// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("europcar.de",function(e){return/Ihre Reservierungsbest\xe4tigung/.test(e.subject)||/Ihre Stornierungsbest\xe4tigung/.test(e.subject)},function(e){var r="de_DE",t={};if(t.confirmSubject=/Ihre Reservierungsbest\xe4tigung/,t.reservationId=/Ihre Reservierungsnummer lautet\: \n([\w\d]+)/,t.modifyUrl="Verwalten Sie Ihre Reservierung",t.guestName="Fahrer:",t.car="Fahrerinformationen",t.pickup="Abholung Ihres Fahrzeugs",t.pickupAddress="Adresse",t.dropoff="R\xfcckgabe Ihres Fahrzeugs",t.price="Gesamtpreis bei",t.cancellationSubject=/Ihre Stornierungsbest\xe4tigung/,t.cancelGuestName=/Sehr geehrte.+r Frau.+Herr (.+)\,/,t.cancelReservationId=/Reservierung storniert haben\: \#([\d\w]+)/,t.time="Abholdatum",!t.confirmSubject.test(e.subject)&&!t.cancellationSubject.test(e.subject))return CONTINUE;var n=loadHelper("europcar-skeleton.js");return n(e,r,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/60/61","SG704faba7"),new ReverseTemplate("europcar.en",function(e){return/Europcar Booking Confirmation Email/.test(e.subject)||/Europcar Confirmation Email/.test(e.subject)||/Cancellation confirmation/.test(e.subject)},function(e){var r="en_GB",t={};if(t.confirmSubject=/(Europcar Booking Confirmation Email)|(Europcar Confirmation Email)/,t.reservationId=/Your booking or reservation number is\:\s?\n([\w\d]+)/,t.modifyUrl="Manage your booking",t.guestName="Drivers:",t.car="Driver details",t.pickup="Picking up your vehicle",t.pickupAddress="Address",t.dropoff="Returning your vehicle",t.price="Total price to pay",t.cancellationSubject=/Cancellation confirmation/,t.cancelGuestName=/Dear (.+)\,/,t.cancelReservationId=/(?:your booking \:|Reservation number) \#([\d\w]+)/,t.time="Pickup date",!t.confirmSubject.test(e.subject)&&!t.cancellationSubject.test(e.subject))return CONTINUE;var n=loadHelper("europcar-skeleton.js");return n(e,r,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/60/62","SGbe9ebf98"),new ReverseTemplate("europcar.fr",function(e){return/Votre r\xe9servation Europcar/.test(e.subject)||/Confirmation d'annulation/.test(e.subject)},function(e){var r="fr_FR",t={};if(t.confirmSubject=/Votre r\xe9servation Europcar/,t.reservationId=/Num\xe9ro de r\xe9servation\: \n([\w\d]+)/,t.modifyUrl="G\xe9rez vos r\xe9servations",t.guestName="Nom:",t.car="INFORMATIONS DU CONDUCTEUR",t.pickup="Agence de d\xe9part :",t.pickupAddress="Adresse:",t.dropoff="Agence de retour :",t.price="Prix TTC \xe0 payer en",t.cancellationSubject=/Confirmation d'annulation/,t.cancelGuestName=/Cher\(e\) (.+)\,/,t.cancelReservationId=/Nous vous confirmons l'annulation de votre r\xe9servation \: \#([\d\w]+)/,t.time="Date de d\xe9part ",!t.confirmSubject.test(e.subject)&&!t.cancellationSubject.test(e.subject))return CONTINUE;var n=loadHelper("europcar-skeleton.js");return n(e,r,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/60/63","SG0aaeee22")]);