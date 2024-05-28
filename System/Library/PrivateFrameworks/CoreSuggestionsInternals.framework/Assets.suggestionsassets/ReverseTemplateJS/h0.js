// Copyright 2014 Apple Inc.  All Rights Reserved.
(function(){return function(e,n){var r,t;for(t=0;e.address.length>t&&(!r||!r.exists());t++)r=n.getSpan().innerCapture(e.address[t],1),r&&(r=r.trim(),r.innerAddress().exists()&&(r=r.innerAddress()));if(!r||!r.exists())for(r=n.getSpan().firstAddress(),t=0;e.footer.length>t;t++)n.getSpan().next(e.footer[t]).contains(r)&&(r=null);return r}}).call();
