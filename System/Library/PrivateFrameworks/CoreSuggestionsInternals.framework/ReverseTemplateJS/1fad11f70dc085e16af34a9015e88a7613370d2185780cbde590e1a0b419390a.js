// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("fairmont.com",function(e){return/Reservation Confirmation Mail/.test(e.subject)||/Reservation Cancellation/.test(e.subject)},function(e){var n="en_CA",t={};t.emailTitelConfirmation=/Reservation Confirmation Mail/,t.reservationId=/Your reservation number is:/,t.checkInDate=/Arriving on/,t.checkOutDate=/Departing on/,t.guestName=/Dear (.+)/,t.price=/Total\: (.+)/,t.modifyUrl=/Make an activity booking or change your reservation/,t.hotelInfo=/Cancel By/,t.hotelAddress=/Tel/,t.emailTitelCancelConfirmation=/Reservation Cancellation/,t.cancelReservationId=/Your reservation\s+\n\n(.+)\n/;var r=loadHelper("fairmont.com.js");return r(e,n,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/406/407","SG6dd3cb97"),new ReverseTemplate("fairmont.com-txt",function(e){return/Fairmont Hotels and Resorts Reservation/.test(e.subject)},function(e){var n="en_CA",t={};t.emailTitelConfirmation=/Fairmont Hotels and Resorts Reservation/,t.reservationId=/Your confirmation number is\:\s+\n(.+)/,t.checkInDate=/Arriving on/,t.checkOutDate=/Departing on/,t.guestName=/Dear (.+)/,t.price=/Total\: (.+)/,t.modifyUrl=/Make an activity booking or change your reservation/,t.hotelInfo=/Cancel By/,t.hotelAddress=/TEL/;var r=loadHelper("fairmont.com-txt.js");return r(e,n,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/406/408","SG4c563674")]);