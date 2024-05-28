// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("mytable.com-cancellation-de",function(e){return/^Reservierung \d+ storniert/.test(e.subject)},function(e){if(/^Reservierung \d+ storniert/.test(e.subject)){var n={};n.number="Person",n.name="Name des Restaurants",n.confirmation="Reservierungsnummer",n.phone="Telefonnummer des Restaurants",n.address="Adresse",n.date="Datum";var t="de_DE",r=loadHelper("mytable.com-cancellation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/708","SGf1a96178"),new ReverseTemplate("mytable.com-cancellation-en",function(e){return/^Reservation \d+ canceled/.test(e.subject)},function(e){if(/^Reservation \d+ canceled/.test(e.subject)){var n={};n.number="Number in party",n.name="Restaurant name",n.confirmation="Confirmation #",n.restaurant="Restaurant",n.phone="Restaurant Tel:",n.address="Address",n.date="Date";var t="en_US",r=loadHelper("mytable.com-cancellation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/709","SG8cee992b"),new ReverseTemplate("mytable.com-cancellation-fr",function(e){return/R\xe9servation \d+ annul\xe9e/.test(e.subject)},function(e){if(/R\xe9servation \d+ annul\xe9e/.test(e.subject)){var n={};n.number="Nombre de personne",n.name="Nom du restaurant",n.confirmation="Confirmation #",n.phone="Tel Restaurant",n.address="Adresse",n.date="Date";var t="fr_FR",r=loadHelper("mytable.com-cancellation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/710","SGbd7e4001"),new ReverseTemplate("mytable.com-confirmation-de",function(e){return/^Reservierungsbest\xe4tigung f\xfcr/.test(e.subject)},function(e){if(/^Reservierungsbest\xe4tigung f\xfcr/.test(e.subject)){var n={};n.number="Person",n.name="Reservierungsbest\xe4tigung f\xfcr",n.phone="Telefonnummer:",n.address="Adresse",n.date="Datum",n.cancel="oder zur \xc4nderung/Stornierung";var t="de_DE",r=loadHelper("mytable.com-confirmation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/711","SGc9da8860"),new ReverseTemplate("mytable.com-confirmation-en",function(e){return/^Reservation confirmation/.test(e.subject)},function(e){if(/^Reservation confirmation/.test(e.subject)){var n={};n.number="Number in party",n.name="Reservation confirmation -",n.phone="Restaurant Tel:",n.address="Address",n.date="Date",n.cancel="to cancel";var t="en_US",r=loadHelper("mytable.com-confirmation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/712","SG43ca18c0"),new ReverseTemplate("mytable.com-confirmation-fr",function(e){return/^Confirmation .+\xe9servation/.test(e.subject)},function(e){if(/^Confirmation .+\xe9servation/.test(e.subject)){var n={};n.number="Nombre de personne",n.name="Confirmation de la R\xe9servation -",n.phone="Tel Restaurant",n.address="Adresse",n.date="Date",n.cancel="si vous souhaitez annuler la r\xe9servation",n.under="R\xe9servation au nom de:";var t="fr_FR",r=loadHelper("mytable.com-confirmation-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/713","SG12510517"),new ReverseTemplate("mytable.com-upcoming-de",function(e){return/^Erinnerung an Ihre Reservierung/.test(e.subject)},function(e){if(/^Erinnerung an Ihre Reservierung/.test(e.subject)){var n={};n.number="Personenzahl",n.name="Reserviert durch:",n.restaurant="Restaurant:",n.website="Webseite des Restaurants",n.phone="Telefon:",n.address="Addresse",n.date="Datum";var t="de_DE",r=loadHelper("mytable.com-upcoming-skeleton.js");return r(e,t,n)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/707/715","SG3d0cd6a8")]);