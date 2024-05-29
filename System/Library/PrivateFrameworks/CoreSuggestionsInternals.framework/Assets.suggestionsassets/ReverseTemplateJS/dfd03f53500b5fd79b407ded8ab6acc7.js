// Copyright 2014 Apple Inc.  All Rights Reserved.
new ReverseTemplateList([new ReverseTemplate("vliegtickets.nl-car-confirmation-nl",function(e){return/Uw(.*)Reservering/.test(e.subject)},function(e){if(/Uw(.*)Reservering/.test(e.subject)){var t=loadHelper("vliegtickets.nl-microdata-parser.js"),r=t(e);return r?r:CONTINUE}},"0/1/2/3/4/5/6/5/7/7/7/7/4/8/9/1014/1209/1210","SGef24e48f")]);
