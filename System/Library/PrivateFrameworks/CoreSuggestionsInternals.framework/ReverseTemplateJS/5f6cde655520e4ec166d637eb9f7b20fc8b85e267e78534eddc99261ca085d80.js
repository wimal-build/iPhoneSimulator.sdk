// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("hertz.com-confirmation-de",function(e){return/^Meine Hertz Reservierung/.test(e.subject)||/^Stornierung Ihrer Hertz Reservierung/.test(e.subject)},function(e){if(/^Meine Hertz Reservierung/.test(e.subject)||/^Stornierung Ihrer Hertz Reservierung/.test(e.subject)){var r="de_DE",i={};i.customerNamePrefix=/Thanks for Traveling at the Speed of Hertz/,i.reservationIdPrefix=/(?:Ihre Reservierungsnummer lautet:|Nummer Ihrer Stornierung|Reservierungsnummer:)/,i.modifyReservationUrlPrefix=/Reservierung \xe4ndern \/ stornieren/,i.viewModifyReservationUrlPrefix="View/Modify/Cancel",i.beginCheckInUrlPrefix="Begin Check-In",i.onlineCheckInUrlPrefix=/\u201eOnline Check-In\u201c/,i.pickupTimePrefix="Anmietung",i.returnTimePrefix="R\xfcckgabe",i.pickupAndReturnLocationPrefix=/(?:Anmietstation & R\xfcckgabestation|Ort der Anmietung und Ort der R\xfcckgabe)/,i.pickupLocationPrefix=/Anmietstation/,i.returnLocationPrefix="R\xfcckgabestation",i.addressPrefix="Adresse",i.yourVehiclePrefix="Ihr Fahrzeug",i.totalApproximateChargePrefix=/Voraussichtliche Kosten/,i.priceGuarantee=/Der Preis ist garantiert/,i.locationTypePrefix="Anmietstation::",i.discountsPrefix="Zugeh\xf6rigkeit",i.phoneNumberPrefix="Telefonnummer::",i.approximateChargePrefix=/Voraussichtliche Kosten/,i.isCancelled=/^Stornierung Ihrer Hertz Reservierung/.test(e.subject);var t=loadHelper("hertz.com-confirmation-skeleton.js");return t(e,r,i)}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/65/67","SG95855011")]);