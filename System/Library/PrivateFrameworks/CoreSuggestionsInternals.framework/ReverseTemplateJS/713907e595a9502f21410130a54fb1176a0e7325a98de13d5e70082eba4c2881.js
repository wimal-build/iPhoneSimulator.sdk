// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("accorhotels.com",function(e){return/Your reservation N\xb0/.test(e.subject)||/Cancellation confirmation/.test(e.subject)},function(e){var t="en_GB",n={};n.reservationName=/Reservation made in the name of\s+:/,n.reservationId=/Reservation number\s+:/,n.emailTitelConfirmation=/Your reservation N\xb0/,n.yourReservation="Your reservation",n.dates=/Dates of stay.+from\s(.+)\sto\s(.+)\s,.+/,n.price=/The amount to be paid at the hotel is (.+)/,n.checkInPolicy=/Check in Policy/,n.checkOutPolicy=/Check out Policy/,n.emailTitelCancelConfirmation=/Cancellation confirmation/;var r=loadHelper("emailToJsonLd_skeleton.js");return r(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/357/359","SGf88678c2"),new ReverseTemplate("accorhotels.de",function(e){return/Ihre Buchung N\xb0/.test(e.subject)||/Storno-Best\xe4tigung/.test(e.subject)},function(e){var t="de_DE",n={};n.reservationName=/Reservierung erfolgt auf den Namen\s+\:/,n.reservationId=/Buchungsnummer\s+\:/,n.emailTitelConfirmation=/Ihre Buchung N\xb0/,n.yourReservation="Ihre Buchung",n.dates=/Aufenthaltsdaten.+vom\s(.+)\sbis\s(.+)\s,.+/,n.price=/Der im Hotel zu zahlende Betrag bel\xe4uft sich auf (.+)/,n.checkInPolicy=/Anreisezeit/,n.checkOutPolicy=/Abreisezeit/,n.emailTitelCancelConfirmation=/Storno-Best\xe4tigung/;var r=loadHelper("emailToJsonLd_skeleton.js");return r(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/357/360","SG42b45c18"),new ReverseTemplate("accorhotels.fr",function(e){return/Votre r\xe9servation/.test(e.subject)||/Confirmation d\xb4annulation/.test(e.subject)},function(e){var t="fr_FR",n={};n.reservationName=/(?:R\xe9servation effectu\xe9e|R\xc3\xa9servation effectu\xc3\xa9e) au nom de\s+:/,n.reservationId=/(?:Num\xc3\xa9ro de r\xc3\xa9servation|Num\xe9ro de r\xe9servation)\s+:/,n.emailTitelConfirmation=/Votre r\xe9servation/,n.yourReservation="Votre r\xe9servation",n.dates=/Dates du s(?:\xe9|\xc3\xa9)jour.+du\s(.+)\sau\s(.+)\s,.+/,n.price=/Le montant \xe0 r\xe9gler sur place est de (.+)/,n.checkInPolicy=/Heure d'enregistrement/,n.checkOutPolicy=/Heure de d\xe9part/,n.emailTitelCancelConfirmation=/Confirmation d\xb4annulation/;var r=loadHelper("emailToJsonLd_skeleton.js");return r(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/357/361","SG5df63dbf"),new ReverseTemplate("accorhotels.zh",function(e){return/\u60a8\u7684\u9884\u8ba2/.test(e.subject)||/\u53d6\u6d88\u60a8\u7684\u9884\u8ba2/.test(e.subject)},function(e){var t="zh_Hans_CN",n={};n.reservationName=/\u901a\u8fc7\u4ee5\u4e0b\u540d\u4e49\u9884\u8ba2\uff1a/,n.reservationId=/\u9884\u8ba2\u53f7\u7801\s+:/,n.emailTitelConfirmation=/^\u60a8\u7684\u9884\u8ba2/,n.yourReservation="\u60a8\u7684\u9884\u8ba2",n.dates=/\u5165\u4f4f\u65e5\u671f\s+:\s+\u4ece(.+?)\u81f3(.+?)\s,/,n.price=/\u9700\u5728\u9152\u5e97\u652f\u4ed8\u7684\u91d1\u989d\u4e3a\s+(.+)/,n.checkInPolicy=/\u5165\u4f4f\u653f\u7b56/,n.checkOutPolicy=/\u7ed3\u8d26\u653f\u7b56/,n.emailTitelCancelConfirmation=/^\u53d6\u6d88\u60a8\u7684\u9884\u8ba2/;var r=loadHelper("emailToJsonLd_skeleton.js");return r(e,t,n)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/357/362","SGb2adddf4")]);