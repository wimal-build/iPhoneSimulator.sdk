// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("airfrance.com-reminder-de",function(e){return/^Achtung\: Erg\xe4nzen Sie die Informationen f\xfcr Ihren Flug/.test(e.subject)},function(e){if(/Achtung\: Erg\xe4nzen Sie die Informationen f\xfcr Ihren Flug/.test(e.subject)){var n="de_DE",r={};r.name="Sehr geehrter Herr",r.flightInfo="Fluginformationen",r.reservationId="Buchungscode";var t=loadHelper("airfrance.com-reminder-skeleton.js");return t(e,n,r)}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/127/162/171","SGbe7cef95")]);