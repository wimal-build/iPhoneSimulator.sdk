// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,t,n){if(!e||!t||!n)return CONTINUE;var a=Scanner.fromMessage(e);a.setLocale(t);var r,i,c,d,g,o,s,p,h,l,D,u,m,x,T,k;if(r=a.getSpan().nextText(n.reservedFor).nextAnyTag("td").tagContents(),""+r==""&&(r=r.nextAnyTag("td").tagContents()),r=r.innerCapture(/(.*)\s+\d/,1).trim(),o=a.getSpan().innerCapture(regExpFormatted(/\b\1 (\d+)/,n.reservationId),1),c=o.parentAnyTag("table"),valid(c)){var v=c.getTagNumber();if(c=c.allInnerTagsFiltered("td"+v),c.length>=2)if(x=c[0],l=a.getDateDD(c[1].innerDate()),valid(l))u=a.getDetachedSpan(l.endIso8601),D=a.getDetachedSpan(l.iso8601);else if(c[1].innerText("/").exists()){var S,C,$=c[1].innerCapture(/($<checkInDate>\d{4}\/\w+\/\d+).+($<checkOutDate>\d{4}\/\w+\/\d+)/);$&&$.$checkInDate&&$.$checkOutDate?(S=(""+$.$checkInDate).split("/"),S.length>=3&&(D=a.getDetachedSpan(S[1]+"/"+S[2]+"/"+S[3]).innerDate()),C=(""+$.$checkOutDate).split("/"),C.length>=3&&(u=a.getDetachedSpan(C[1]+"/"+C[2]+"/"+C[3]).innerDate())):($=c[1].innerCapture(/($<checkInDate>\d+\/\w+\/\d{4}).+($<checkOutDate>\d+\/\w+\/\d{4})/),$&&$.$checkInDate&&$.$checkOutDate&&(D=a.getDetachedSpan((""+$.$checkInDate).replace("/"," ")).innerDate(),u=a.getDetachedSpan((""+$.$checkOutDate).replace("/"," ")).innerDate()))}}return m=a.getSpan().nextText(n.hotelDetails).nextLink(),c=m.parentAnyTag("td").tagContents(),k=c.innerCapture(regExpFormatted(/\1.*?>\s+(.*)</,n.hotelDetails),1).trim(),c.innerAddress().getLength()>=k.getLength()&&(k=c.innerAddress()),T=c.innerCapture(regExpFormatted(/\b\1 ([-\d\(\) ]+),/,n.telephone),1),h=a.getSpan().nextText(n.checkin).nextText(n.checkinTime).nextDate(),valid(D,h)&&(D=combineDateAndTime(D,h)),d=a.getSpan().nextText(n.priceSummary).nextText(n.totalPrice).nextTag("td7").tagContents().innerCapture(/([\d,.]+)/,1),g=a.getSpan().innerCapture(regExpFormatted(/\1 ([A-Z]{3})/,n.priceCurrency),1),ASSERT(k,D,u)?[{"@context":"http://schema.org","@type":"http://schema.org/LodgingReservation",underName:{"@type":"http://schema.org/Person",name:r,email:i},totalPrice:d,priceCurrency:g,checkinTime:D,checkoutTime:u,modifyReservationUrl:s,cancelReservationUrl:p,reservationStatus:"http://schema.org/ReservationConfirmed",reservationId:o,reservationFor:{"@type":"http://schema.org/LodgingBusiness",name:x,url:m,telephone:T,address:k}}]:void 0}}).call();