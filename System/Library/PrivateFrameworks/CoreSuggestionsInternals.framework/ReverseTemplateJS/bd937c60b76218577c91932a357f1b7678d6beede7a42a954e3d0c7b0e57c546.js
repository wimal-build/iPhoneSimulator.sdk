// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("piconfirmations.co.uk",function(e){return/Premier Inn booking/.test(e.subject)||/Premier Inn cancellation/.test(e.subject)},function(e){var n="en_GB",o={};o.emailTitelConfirmation=/Premier Inn booking/,o.reservationId=/Booking reference number: (.+)/,o.guestName=/Guest name: (.+)/,o.hotel="Hotel details",o.hotelAddress=/.+\n([\s\S]*?)\n\(See map below for directions\)/,o.hotelUrl="Hotel Details",o.checkInDate="Arrival date:",o.checkOutDate="Departure date:",o.modifyUrl="or by selecting View, amend or cancel booking",o.price=/Total room cost:|Total accommodation cost:/,o.emailTitelCancelConfirmation=/Premier Inn cancellation/;var t=loadHelper("piconfirmations.co.uk.js");return t(e,n,o)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/356/492/493","SG2b4ca2ec")]);