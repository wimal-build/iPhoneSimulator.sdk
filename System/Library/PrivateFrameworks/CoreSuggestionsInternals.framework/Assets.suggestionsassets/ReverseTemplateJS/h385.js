// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,o,s,p,g=a.getSpan(),c="Confirmed";return r=g.innerCapture(regExpFormatted(/\1 (.*) </,n.eventName_prefix),1),i=g.next(n.eventName_prefix).nextLink(),p=(""+g.next(n.info_prefix).nextAnyTag("table").nextAnyTag("td").nextAnyTag("td").tagContents()).replace(/\n\n/," "),p=getFuzzyDate(a.getDetachedSpan(p).innerDate()),p&&p!==a.getNullSpan()||(p=g.next(n.info_prefix).firstDate()),g.next(n.directions)!==a.getNullSpan()&&(o=(""+g.next(n.info_prefix).nextAnyTag("table").nextAnyTag("table").nextAnyTag("td").nextAnyTag("td").tagContents()).replace(/\n\n/g,", ").split(n.directions)[0]),ASSERT(r,p)?[{"@context":"http://schema.org","@type":"http://schema.org/EventReservation",reservationStatus:"http://schema.org/Reservation"+c,reservationId:"",reservationFor:{name:r,url:i,"@type":"http://schema.org/SocialEvent",startDate:p,endDate:"",description:s,location:{"@type":"http://schema.org/Place",address:o}}}]:void 0}}).call();
