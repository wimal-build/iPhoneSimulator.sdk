// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("airbnb.com-billing-receipt-en",function(e){return/^Billing receipt for reservation/.test(e.subject)},function(e){if(int(e.epoch)<1405398e3)return CONTINUE;if(/^Billing receipt for reservation/.test(e.subject)){var r="en_US",t={};t.reservationId="Confirmation Code:",t.guests=/Guests?/,t.hotelAddress="Accommodation Address",t.hotelName="Travel Property",t.arrivalDate=/(Arrive|Check\-in)/,t.departureDate=/(Depart|Checkout)/,t.price="Total",t.otherGuest=/and \d others?/;var i=loadHelper("airbnb.com-billing-receipt-skeleton.js");return i(e,r,t)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/691","SGd8c8e437"),new ReverseTemplate("airbnb.com-billing-receipt-fr",function(e){return/^Re\xe7u de la r\xe9servation/.test(e.subject)},function(e){if(/^Re\xe7u de la r\xe9servation/.test(e.subject)){var r="fr_FR",t={};t.reservationId="Code de confirmation :",t.guests=/Voyageurs?/,t.hotelAddress="Adresse du logement",t.hotelName="Nom du logement",t.arrivalDate="Arriv\xe9e",t.departureDate="D\xe9part",t.price="Total",t.otherGuest=/NOT DEFINED/;var i=loadHelper("airbnb.com-billing-receipt-skeleton.js");return i(e,r,t)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/692","SG8f4cbca3"),new ReverseTemplate("airbnb.com-confirmed-de",function(e){return/(Buchung best\xe4tigt|Reiseplan von)/.test(e.subject)},function(e){if(!/(Buchung best\xe4tigt|Reiseplan von)/.test(e.subject))return CONTINUE;if(int(e.epoch)<1405659768)return CONTINUE;var r,t="de_DE",i={};return i.underPersonNamePrefix="Hallo",i.reservationIdPrefix="Best\xe4tigungscode:",i.checkInDateTimePrefix="Ankunft",i.checkOutDateTimePrefix="Abreise",i.hotelNamePrefix="Dein Gastgeber",i.pricePrefix="Gesamtsumme",(r=loadHelper("airbnb.com-itinerary-skeleton.js"))(e,t,i)},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/695","SG4ee9f2b7"),new ReverseTemplate("airbnb.com-confirmed-en",function(e){return/^Reservation\s[cC]onfirmed/i.test(e.subject)||/Your trip.*is confirmed/.test(e.subject)},function(e){if(int(e.epoch)<1405398e3)return CONTINUE;if(/^Reservation\s[cC]onfirmed/.test(e.subject)&&(/Your reservation is confirmed/.test(e.html)||/Your Host/.test(e.html))||/Your trip.*is confirmed/.test(e.subject)){var r,t="en_US",i={};return int(e.epoch)<1451677038?(i.underPersonNamePrefix="Hi",i.reservationIdPrefix="Confirmation Code:",i.checkInDateTimePrefix="Arrive",i.checkOutDateTimePrefix="Depart",i.hotelNamePrefix="Your Host",i.pricePrefix="Total",r=loadHelper("airbnb.com-itinerary-skeleton.js")):(i.reservationId_prefix=/View Receipt/,i.address_prefix=/Address/,i.dates_prefix=/Get Directions/,i.hotelName_prefix=/You.re going to/,i.modifyReservationUrl_prefix=/Change Your Reservation/,i.hotelUrl_prefix=/View Full Itinerary/,i.hotelAddress_prefix=/Address/,r=loadHelper("airbnb.com-confirmation-skeleton-S22.js")),r(e,t,i)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/696","SG84fe959e"),new ReverseTemplate("airbnb.com-confirmed-fr",function(e){return/^(R\xe9servation confirm\xe9e)/.test(e.subject)},function(e){if(!/^(R\xe9servation confirm\xe9e)/.test(e.subject))return CONTINUE;if(/Pr\xe9parez-vous pour l'arriv\xe9e/.test(e.plain))return CONTINUE;if(int(e.epoch)<1405397304)return CONTINUE;var r,t="fr_FR",i={};return i.underPersonNamePrefix="Bonjour",i.reservationIdPrefix="Code de confirmation :",i.checkInDateTimePrefix="Arriv\xe9e",i.checkOutDateTimePrefix="D\xe9part",i.hotelNamePrefix="Votre h\xf4te",i.pricePrefix="Total",(r=loadHelper("airbnb.com-itinerary-skeleton.js"))(e,t,i)},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/697","SG8f9c954e"),new ReverseTemplate("airbnb.com-confirmed-ja",function(e){return/(\u4e88\u7d04\u304c\u78ba\u5b9a\u3057\u307e\u3057\u305f|\u3055\u3093\u306e\u65c5\u7a0b\u8868)/.test(e.subject)},function(e){if(!/(\u4e88\u7d04\u304c\u78ba\u5b9a\u3057\u307e\u3057\u305f|\u3055\u3093\u306e\u65c5\u7a0b\u8868)/.test(e.subject))return CONTINUE;if(int(e.epoch)<1405397304)return CONTINUE;var r,t="ja_JP",i={};return i.underPersonNamePrefix="\u3055\u3093",i.reservationIdPrefix="\u78ba\u8a8d\u30b3\u30fc\u30c9\uff1a",i.checkInDateTimePrefix=/\u5230\u7740\s+/,i.checkOutDateTimePrefix="\u51fa\u767a",i.hotelNamePrefix="\u3042\u306a\u305f\u306e\u30db\u30b9\u30c8",i.pricePrefix="\u5408\u8a08",(r=loadHelper("airbnb.com-itinerary-skeleton.js"))(e,t,i)},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/698","SG56b7f093"),new ReverseTemplate("airbnb.com-confirmed-zh",function(e){return/\u9884\u8ba2\u5df2\u786e\u8ba4|\u7684\u9884\u8ba2\u884c\u7a0b\u5355/.test(e.subject)},function(e){if(!/\u9884\u8ba2\u5df2\u786e\u8ba4|\u7684\u9884\u8ba2\u884c\u7a0b\u5355/.test(e.subject))return CONTINUE;if(int(e.epoch)<1405398e3)return CONTINUE;var r,t="zh_Hans_CN",i={};return i.underPersonNamePrefix="\uff0c\u60a8\u597d",i.reservationIdPrefix="\u786e\u8ba4\u7801\uff1a",i.checkInDateTimePrefix="\u5165\u4f4f",i.checkOutDateTimePrefix="\u9000\u623f",i.hotelNamePrefix="\u60a8\u7684\u623f\u4e1c",i.pricePrefix="\u603b\u4ef7",(r=loadHelper("airbnb.com-itinerary-skeleton.js"))(e,t,i)},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/699","SG52fb6352"),new ReverseTemplate("airbnb.com-forwarded-itinerary-en",function(e){return/^Reservation Itinerary from/.test(e.subject)||/trip invitation to/.test(e.subject)},function(e){if(/^Reservation Itinerary from/.test(e.subject)||/trip invitation to/.test(e.subject)){if(int(e.epoch)<1405398e3)return CONTINUE;var r,t="en_US",i={};return/Get ready for/.test(e.html)?(i.name_suffix=/booked a place in/,i.reservationId_prefix=/Confirmation code:/,i.dates_prefix=/Check In/,i.hotelName_prefix=/Get ready for/,i.hotelPhone_prefix=/Meet your host/,r=loadHelper("airbnb.com-forwarded-itinerary-skeleton-S22.js")):(i.underPersonNamePrefix="Hi",i.reservationIdPrefix="Confirmation Code:",i.checkInDateTimePrefix="Arrive",i.checkOutDateTimePrefix="Depart",i.hotelNamePrefix="Your Host",i.pricePrefix="Total",r=loadHelper("airbnb.com-itinerary-skeleton.js")),r(e,t,i)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/700","SG1233aa82"),new ReverseTemplate("airbnb.com-host-confirmed-en",function(e){return/^Reservation\s[cC]onfirmed/i.test(e.subject)},function(e){if(/^Reservation\s[cC]onfirmed/.test(e.subject)&&/New booking confirmed/.test(e.html)){if(!/New booking confirmed/.test(e.plain))return CONTINUE;var r="en_US",t={};t.reservationId_prefix=/Confirmation Code/,t.dates_prefix=/Check In/,t.visitorName_prefix=/Reservation Confirmed - /,t.title_prefix="Airbnb, hosting ";var i;return(i=loadHelper("airbnb.com-host-confirmed-skeleton.js"))(e,r,t)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/702","SG6dfe2f15"),new ReverseTemplate("airbnb.com-host-confirmed-fr",function(e){return/^R\xe9servation confirm\xe9/i.test(e.subject)},function(e){if(/^R\xe9servation confirm\xe9/.test(e.subject)){if(!/Pr\xe9parez-vous pour l'arriv\xe9e/.test(e.plain))return CONTINUE;var r="fr_FR",t={};t.reservationId_prefix=/Code de confirmation/,t.dates_prefix=/Arriv\xe9e/,t.visitorName_prefix=/R\xe9servation confirm\xe9e - /,t.title_prefix="Airbnb, h\xe9bergement de ";var i;return(i=loadHelper("airbnb.com-host-confirmed-skeleton.js"))(e,r,t)}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/690/703","SG0166aae0")]);
