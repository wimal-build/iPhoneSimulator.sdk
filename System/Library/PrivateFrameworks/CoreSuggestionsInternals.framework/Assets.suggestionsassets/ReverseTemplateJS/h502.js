// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e){if(e.html){var a=parseMicrodata(e.html),o=[];if(a.length||(raw=/<script type="application\/ld\+json">([\s\S]*)<\/script>([\s\S]*)<\/script>/.exec(e.html),raw&&a.push(JSON.parse(raw[1].replace(/\\\'/g,"'")))),a.length){for(var r=0;a.length>r;r++)switch(a[r]["@context"]="http://schema.org",a[r]["@type"]){case"RentalCarReservation":ASSERT(a[r].pickupTime,a[r].underName),o.push({"@context":"http://schema.org","@type":"http://schema.org/RentalCarReservation",reservationId:a[r].reservationNumber,reservationStatus:a[r].reservationStatus,modifyReservationUrl:a[r].url,cancelReservationUrl:a[r].url,underName:{"@type":"http://schema.org/Person",name:a[r].underName.name},provider:{"@type":"http://schema.org/Organization",name:a[r].reservationFor.rentalCompany.name},reservationFor:{"@type":"http://schema.org/Car",brand:{"@type":"http://schema.org/Organization",name:a[r].reservationFor.brand.name}},pickupTime:a[r].pickupTime,pickupLocation:{"@type":"http://schema.org/Place",name:a[r].pickupLocation.name,telephone:a[r].pickupLocation.telephone,address:{"@type":"http://schema.org/PostalAddress",streetAddress:a[r].pickupLocation.address.streetAddress,addressCountry:a[r].pickupLocation.address.addressCountry,addressLocality:a[r].pickupLocation.address.addressLocality,addressRegion:a[r].pickupLocation.address.addressRegion,postalCode:a[r].pickupLocation.address.postalCode}},dropoffTime:a[r].dropoffTime,dropoffLocation:{"@type":"http://schema.org/Place",name:a[r].dropoffLocation.name,telephone:a[r].dropoffLocation.telephone,address:{"@type":"http://schema.org/PostalAddress",streetAddress:a[r].dropoffLocation.address.streetAddress,addressCountry:a[r].dropoffLocation.address.addressCountry,addressLocality:a[r].dropoffLocation.address.addressLocality,addressRegion:a[r].dropoffLocation.address.addressRegion,postalCode:a[r].dropoffLocation.address.postalCode}}})}return o.length>0?o:CONTINUE}}}}).call();
