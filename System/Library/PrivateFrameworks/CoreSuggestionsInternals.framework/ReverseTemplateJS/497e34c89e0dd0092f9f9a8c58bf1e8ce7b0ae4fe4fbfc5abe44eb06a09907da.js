// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("lastminute.com-flight-confirmation-de",function(e){return/^Anmeldung\/Auftrag/.test(e.subject)},function(e){if(!/^Anmeldung\/Auftrag/.test(e.subject))return CONTINUE;var r="de_DE",t={};t.flightDetailsHeader="Details",t.fromPrefix="Ab:",t.flightNumberPrefix="Flugnummer",t.airlineNamePrefix="Durchgef\xfchrt von",t.toPrefix="An:",t.reservationIdPrefix="Flugreferenznummer",t.pricePrefix="Gesamtpreis",t.passengerDetailsHeader="Ihre Daten",t.passengerNamePrefix="Reisende",t.passengerEmailPrefix="E-mail";var i=loadHelper("lastminute.com-flight-confirmation-skeleton.js");return i(e,r,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/577/632/636","SG439d147d")]);