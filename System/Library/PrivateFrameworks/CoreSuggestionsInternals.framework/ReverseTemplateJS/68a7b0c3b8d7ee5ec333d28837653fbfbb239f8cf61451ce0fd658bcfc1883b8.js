// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("obee.com.au-cancellation-en",function(e){return/Booking Cancelled$/.test(e.subject)},function(e){if(/Booking Cancelled$/.test(e.subject)){var n={};n.confirmation="BOOKING CANCELLED",n.table="Table for",n.time="Time",n.booking="Booking for",n.phone="Phone:",n.otherPhone="can be contacted";var o="en_AU",t=loadHelper("obee.com.au-skeleton.js"),a="Cancelled";return t(e,o,n,a)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/716/717","SG852a9e58"),new ReverseTemplate("obee.com.au-confirmation-en",function(e){return/Booking Confirmation$/.test(e.subject)},function(e){if(/Booking Confirmation$/.test(e.subject)&&!/CHANGE BOOKING/.test(e.plain)){var n={};n.confirmation="BOOKING CONFIRMATION",n.table="Table for",n.cancel="You can edit or cancel",n.time="Time",n.booking="Booking for",n.phone="Phone:",n.otherPhone="call the restaurant";var o="en_AU",t=loadHelper("obee.com.au-skeleton.js"),a="Confirmed";return t(e,o,n,a)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/716/718","SG4315fdbf"),new ReverseTemplate("obee.com.au-reservation-change",function(e){return/Booking Confirmation$/.test(e.subject)},function(e){if(/Booking Confirmation$/.test(e.subject)&&/CHANGE BOOKING/.test(e.plain)){var n={};n.confirmation="CHANGE BOOKING",n.table="Table for",n.cancel="You can edit or cancel",n.time="Time",n.booking="Booking for",n.phone="Phone:",n.otherPhone="call the restaurant";var o="en_AU",t=loadHelper("obee.com.au-skeleton.js"),a="Confirmed";return t(e,o,n,a)}return CONTINUE},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/674/716/719","SGef5d9ab4")]);