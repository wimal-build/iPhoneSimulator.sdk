// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("venere-cancellation-en",function(e){return/Your booking has been cancelled/.test(e.subject)},function(e){if(/Your booking has been cancelled/.test(e.subject)){var n=loadHelper("venere-schemaorg-parser.js"),r=n(e);if(r)return r}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/662/955/956","SG10d33264")]);
