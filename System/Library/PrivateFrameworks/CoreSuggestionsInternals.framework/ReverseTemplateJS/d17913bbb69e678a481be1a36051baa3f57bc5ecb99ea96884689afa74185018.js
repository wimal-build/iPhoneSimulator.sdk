// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("lastminute.com-cancellation-en",function(n){return/booking cancellation$/.test(n.subject)},function(n){if(/booking cancellation$/.test(n.subject)){var e={};e.confirm="Confirmation number:",e.restaurant="Restaurant:",e.cancel="booking cancellation";var t="en_US",o=loadHelper("lastminute.com-cancellation-skeleton.js");return o(n,t,e)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/632/705","SGdc0174da"),new ReverseTemplate("lastminute.com-confirmation-en",function(n){return/^Booking confirmation/.test(n.subject)},function(n){if(/^Booking confirmation/.test(n.subject)){var e={};e.confirm="Confirmation number:",e.restaurant="Restaurant:",e.booking="Booking confirmation for",e.cancel="cancel your booking";var t="en_US",o=loadHelper("lastminute.com-confirmation-skeleton.js");return o(n,t,e)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/632/706","SG94feda71")]);