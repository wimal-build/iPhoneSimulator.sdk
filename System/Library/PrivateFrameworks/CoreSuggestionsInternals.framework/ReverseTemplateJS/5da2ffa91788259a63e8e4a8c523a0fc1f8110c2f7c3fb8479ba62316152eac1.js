// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("nipponrentacar.co.jp",function(e){return/\u3054\u4e88\u7d04\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059|\u3054\u4e88\u7d04\u306e\u5909\u66f4\u3092\u627f\u308a\u307e\u3057\u305f/.test(e.subject)||/\u307e\u305f\u306e\u3054\u4e88\u7d04\u3092\u304a\u5f85\u3061\u3057\u3066\u3044\u307e\u3059/.test(e.subject)},function(e){var c="ja_JP",t={};if(t.confirmSubject=/\u3054\u4e88\u7d04\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059|\u3054\u4e88\u7d04\u306e\u5909\u66f4\u3092\u627f\u308a\u307e\u3057\u305f/,t.reservationId=/\u4e88\u7d04\u756a\u53f7\uff1a(.+)/,t.guestName=/\u304a\u540d\u524d\uff1a(.+)/,t.pickupDate=/\u51fa\u767a\u65e5\u6642.(.+)/,t.dropoffDate=/\u5e30\u7740\u65e5\u6642\uff1a(.+)/,t.pickupLoc=/\u51fa\u767a\u55b6\u696d\u6240\uff1a(.+)/,t.dropoffLoc=/\u5e30\u7740\u55b6\u696d\u6240\uff1a(.+)/,t.car=/\u30af\u30e9\u30b9\uff1a(.+)/,t.price=/\u5408\u8a08\uff1a(.+)/,t.cancellationSubject=/\u307e\u305f\u306e\u3054\u4e88\u7d04\u3092\u304a\u5f85\u3061\u3057\u3066\u3044\u307e\u3059/,t.cancelPickupLoc=/\u51fa\u767a\u55b6\u696d\u6240\uff1a(.+)/,t.cancelDropoffLoc=/\u5e30\u7740\u55b6\u696d\u6240\uff1a(.+)/,!t.confirmSubject.test(e.subject)&&!t.cancellationSubject.test(e.subject))return CONTINUE;var n=loadHelper("nipponrentacar.co.jp-skeleton.js");return n(e,c,t)},"0/1/2/3/4/5/3/5/6/6/6/6/4/7/8/81/82","SG2f6fdc1a")]);