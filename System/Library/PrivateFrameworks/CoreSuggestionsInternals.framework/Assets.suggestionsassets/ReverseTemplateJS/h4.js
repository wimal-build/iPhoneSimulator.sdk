// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(n,e){for(var t,l=0;n.cancelUrl.length>l&&(!t||!t.exists());l++)t=e.getSpan().next(n.cancelUrl[l]).nextLink();return t.exists()||(t=e.getSpan().next(n.altCancelUrl[0]).innerLink()),t}}).call();
