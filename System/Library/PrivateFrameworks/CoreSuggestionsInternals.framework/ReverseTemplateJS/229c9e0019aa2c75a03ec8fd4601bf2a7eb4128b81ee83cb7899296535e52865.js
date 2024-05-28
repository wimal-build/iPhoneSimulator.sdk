// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("zipcar.com-important-change-en",function(e){return/^Important change to your Zipcar reservation/.test(e.subject)},function(e){if(!/^Important change to your Zipcar reservation/.test(e.subject))return CONTINUE;var t=Scanner.fromMessage(e);t.setLocale("en_US");var r,n,a,i,o,s,p,c,h,g,d,m,l,v,u,f,S,C,T,y,R=/\b(?:The|These|This) Zip(?:cars?|vans?) (?:are|is) (?:located|parked) (?:in (?:a|the)|in|at|on) ([\s\S]*?)\./;return r=t.getSpan().innerCapture(/\bHi (.*),/,1),h=t.getSpan().innerCapture(/\bYour new reservation is for\s+(.*?) at/,1),m=t.getSpan(),valid(m)&&(n=m.allDates(),1===n.length?(y=t.getDateDD(n[0]).iso8601,f=t.getDateDD(n[0]).endIso8601):n.length>1&&(y=n[0],f=n[n.length-1]),m.innerAddress().exists()?(C=m.innerAddress(),S=m.innerCapture(R,1)):C=m.innerCapture(R,1),valid(f)&&(v=C,l=S)),ASSERT(r,h,C,y)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:p,priceCurrency:c,reservationId:a,reservationStatus:"http://schema.org/ReservationConfirmed",checkinUrl:i,modifyReservationUrl:o,cancelReservationUrl:s,underName:{"@type":"http://schema.org/Person",name:r},provider:{"@type":"http://schema.org/Organization",name:"Zipcar"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h},license:g,color:d},pickupTime:y,pickupLocation:{"@type":"http://schema.org/Place",name:S,telephone:T,address:C},dropoffTime:f,dropoffLocation:{"@type":"http://schema.org/Place",name:l,telephone:u,address:v}}]:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/121/122","SG66d773ae"),new ReverseTemplate("zipcar.com-reservation-reminder-en",function(e){return/^ZIPCAR: /.test(e.subject)},function(e){if(!/^ZIPCAR: /.test(e.subject))return CONTINUE;var t=Scanner.fromMessage(e);if(t.setLocale("en_US"),!t.getSpan().nextText("Thanks for reserving").exists())return CONTINUE;var r,n,a,i,o,s,p,c,h,g,d,m,l,v,u,f,S,C,T,y,R=/\b(?:The|These|This) Zip(?:cars?|vans?) (?:are|is) (?:located|parked) (?:in (?:a|the)|in|at|on) ([\s\S]*?)\./;if(r=t.getSpan().innerCapture(/\bHi (.*),/,1),o=t.getSpan().nextText("View your reservation confirmation").nextLink(),o&&(a=o.innerCapture(/reservation_id=(\d+)/,1)),m=t.getSpan().innerCapture(/you .+ reservation with ($<brand>.*?)(?: \(($<license>\w+)\))? on ($<date>.*)\. .*? can .+ from (?:.*?)\./)){h=m.$brand,g=m.$license;m=t.getSpan().withInterval(t.getSpan().nextRegExp(/\bYou've got a trip coming up!/).getStart(),t.getSpan().nextRegExp(R).getEnd())}return valid(m)&&(n=m.allDates(),1===n.length?(y=t.getDateDD(n[0]).iso8601,f=t.getDateDD(n[0]).endIso8601):n.length>1&&(y=n[0],f=n[n.length-1]),m.innerAddress().exists()?(C=m.innerAddress(),S=m.innerCapture(R,1)):C=m.innerCapture(R,1),valid(f)&&(v=C,l=S)),ASSERT(r,a,h,C,y)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:p,priceCurrency:c,reservationId:a,reservationStatus:"http://schema.org/ReservationConfirmed",checkinUrl:i,modifyReservationUrl:o,cancelReservationUrl:s,underName:{"@type":"http://schema.org/Person",name:r},provider:{"@type":"http://schema.org/Organization",name:"Zipcar"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h},license:g,color:d},pickupTime:y,pickupLocation:{"@type":"http://schema.org/Place",name:S,telephone:T,address:C},dropoffTime:f,dropoffLocation:{"@type":"http://schema.org/Place",name:l,telephone:u,address:v}}]:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/121/123","SG6506d290"),new ReverseTemplate("zipcar.com-upcoming-reservation-en",function(e){return/^ZIPCAR: /.test(e.subject)},function(e){if(!/^ZIPCAR: /.test(e.subject))return CONTINUE;var t=Scanner.fromMessage(e);if(t.setLocale("en_US"),!t.getSpan().nextText("To see your reservation confirmation visit").exists())return CONTINUE;var r,n,a,i,o,s,p,c,h,g,d,m,l,v,u,f,S,C,T,y,R=/\b(?:The|These|This) Zip(?:cars?|vans?) (?:are|is) (?:located|parked) (?:in (?:a|the)|in|at|on) ([\s\S]*?)\./;return r=t.getSpan().innerCapture(/\b(?:Hi|Hello) (.*),/,1),o=t.getSpan().nextText("To see your reservation confirmation visit").nextLink(),o&&(a=o.innerCapture(/reservation_id=(\d+)/,1)),m=t.getSpan().innerCapture(/\bZip(?:van|car) reservation on ($<brand>.*) from (?:.*) from ($<date>.*)\./),m&&(h=m.$brand,m=t.getSpan().withInterval(t.getSpan().nextRegExp(/\bThis(?: email)? is a reminder/).getStart(),t.getSpan().nextRegExp(R).getEnd())),valid(m)&&(n=m.allDates(),1===n.length?(y=t.getDateDD(n[0]).iso8601,f=t.getDateDD(n[0]).endIso8601):n.length>1&&(y=n[0],f=n[n.length-1]),m.innerAddress().exists()?(C=m.innerAddress(),S=m.innerCapture(R,1)):C=m.innerCapture(R,1),valid(f)&&(v=C,l=S)),ASSERT(r,a,h,C,y)?[{"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",totalPrice:p,priceCurrency:c,reservationId:a,reservationStatus:"http://schema.org/ReservationConfirmed",checkinUrl:i,modifyReservationUrl:o,cancelReservationUrl:s,underName:{"@type":"http://schema.org/Person",name:r},provider:{"@type":"http://schema.org/Organization",name:"Zipcar"},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:h},license:g,color:d},pickupTime:y,pickupLocation:{"@type":"http://schema.org/Place",name:S,telephone:T,address:C},dropoffTime:f,dropoffLocation:{"@type":"http://schema.org/Place",name:l,telephone:u,address:v}}]:void 0},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/121/124","SGf1b452c8")]);