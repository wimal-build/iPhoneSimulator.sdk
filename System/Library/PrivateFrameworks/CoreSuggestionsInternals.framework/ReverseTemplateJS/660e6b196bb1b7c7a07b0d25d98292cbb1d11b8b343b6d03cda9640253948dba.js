// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("opodo.com-flight-confirmation-fr",function(e){return/^Accus\xe9 de r\xe9ception de votre r\xe9servation/.test(e.subject)},function(e){if(/^Accus\xe9 de r\xe9ception de votre r\xe9servation/.test(e.subject)){var r="fr_FR",t={};t.pricePrefix="Montant total de votre commande",t.reservationIdPrefix="R\xe9f\xe9rence de r\xe9servation",t.departureInfoPrefix="D\xe9part:",t.arrivalInfoPrefix="Arriv\xe9e:",t.airlineNamePrefix="Vol assur\xe9 par",t.passengerHeader="Passager(s)";var o=loadHelper("opodo.com-flight-confirmation-skeleton-fr.js");return o(e,r,t)}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/577/646/649","SGccf5f579")]);