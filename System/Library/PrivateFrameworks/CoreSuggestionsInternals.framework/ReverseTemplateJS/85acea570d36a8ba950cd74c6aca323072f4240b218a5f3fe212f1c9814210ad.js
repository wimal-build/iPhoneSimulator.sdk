// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("hilton.com-confirmation-en",function(e){return/Confirmation \#\d+/.test(e.subject)||/^Your Upcoming .* Stay$/.test(e.subject)||/Confirmed/i.test(e.subject)},function(e){if((/Confirmation #\d+/.test(e.subject)||/^Your Upcoming .* Stay$/.test(e.subject))&&(/PLEASE DO NOT REPLY TO THIS EMAIL/.test(e.plain)||/Thank you for booking with us/.test(e.plain))||/Confirmed/i.test(e.subject)){var o,t="en_US",n={};return n.price="Total for Stay:",int(e.epoch)<1420070400?(n.emailTitelConfirmation=/(?:Confirmation #\d+|Your Upcoming .* Stay)/,n.thanksForBookingWithUsText="Thank you for booking with us",n.thanksForBookingWithUsRegexCapture=/\bThank you for booking with us, (.*)/,n.thanksForBookingWithUsRegex=/\bThank you for booking with us,/,n.confirmation=/Confirmation\: (\d+)/,n.modify=/Modify Reservation <(.*?)>/,n.phonePrefix=/T:(.*)/,n.arrival="Arrival:",n.departure="Departure:",n.emailTitelCancelConfirmation=/Hilton.+?Cancellation/,n.cancellation="Cancellation:",o=loadHelper("emailToJsonLd_skeleton.js")):(n.duration="YOUR STAY DATES",n.reservationId="CONFIRMATION",n.name="Welcome",n.checkIn="Check In",n.checkOut="Check Out",o=loadHelper("hilton.com-2015-skeleton.js")),o(e,t,n)}},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/415/420","SGe9c5db0d")]);