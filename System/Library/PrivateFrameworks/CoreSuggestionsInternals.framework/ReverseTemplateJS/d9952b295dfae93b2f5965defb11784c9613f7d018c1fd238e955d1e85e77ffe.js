// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("ticketmaster.com-confirmation-en_AU",function(e){return/^Your Ticket Order Confirmation/.test(e.subject)},function(e){if(!/^Your Ticket Order Confirmation/.test(e.subject))return CONTINUE;var r={};r.total="Total Charge",r.print="Print my tickets",r.number="Your order number for this purchase is",r.valid="valid",r.orderFor="Order for",r.seat="Seat location";var t="en_AU",n=loadHelper("ticketmaster.com-en_AU-confirmation-skeleton.js");return n(e,t,r)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/779/827/832","SG133127a4")]);