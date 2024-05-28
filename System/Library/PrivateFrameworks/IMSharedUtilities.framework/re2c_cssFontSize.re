/*
    $Id: entities.re 886 2006-09-21 22:13:19Z iccir $
    PubSub

    Created by Ricci Adams on 6/13/06.
    Copyright 2008, Apple Inc.  All rights reserved.
*/


/*!ignore:re2c
    This file is used with re2c (http://www.re2c.org/) to generate
    re2c_cssFontSize.m.  UPON MODIFYING THIS FILE, EXECUTE THE FOLLOWING:

    re2c -i re2c_cssFontSize.re > re2c_cssFontSize.m
*/


/*!ignore:re2c
    This function converts a font-size CSS value into an NSUInteger.
    
    In            Out
    ----------    ----------
    "12px"        12
    "xx-small"    8
    "medium"      12
    "smaller"     0   (Not yet supported)
    "larger"      0   (Not yet supported)
    "120%"        0   (Not yet supported)
*/
NSUInteger IMFontSizeFromCSSFontSizeValue(NSString *inFontSize);


/*!max:re2c */ 

NSUInteger IMFontSizeFromCSSFontSizeValue(NSString *inFontSize)
{
	#define ENCODING NSUTF8StringEncoding

    if (!inFontSize) return 0;

    NSUInteger len = [inFontSize lengthOfBytesUsingEncoding:ENCODING] + 1;
    NSUInteger bufferLength = len + YYMAXFILL;
    char *buffer = (char *)alloca(bufferLength);
    memset(buffer, 0, bufferLength);

    if (![inFontSize getCString:buffer maxLength:len encoding:ENCODING]) {
        return 0;
    }

	enum {
		PxType,
		PtType,
		PercentType,
		RelativeSmallerType,
		RelativeLargerType
	} type = PxType;

	NSUInteger value = strtol(buffer, &buffer, 10);

    const unsigned char *i = (unsigned char *)buffer;    // Input pointer
    const unsigned char *marker = NULL;

    #define YYCTYPE   unsigned char
    #define YYCURSOR  i
    #define YYLIMIT   i
    #define YYMARKER  marker
    #define YYFILL(n)
    #define YYDEBUG(state, c) { printf("%d: %c (0x%02x)\n", state, (c > 127 || c < 32) ? '?' : c, c); }

    #define PREVENT_UNUSED_WARNING (void)i; (void)yych;
    #define BREAK    PREVENT_UNUSED_WARNING break;
    #define CONTINUE PREVENT_UNUSED_WARNING continue;

    for ( ; ; ) {
/*!re2c
        ws       = [ \t\r\n];
		px       = "px";
		pt       = "pt";
		percent  = "%";
		xxsmall  = "xx" "-"? "small";
		xsmall   = "x"  "-"? "small";
		small    = "small";
		medium   = "medium";
		large    = "large";
		xlarge   = "x"  "-"? "large";
		xxlarge  = "xx" "-"? "large";	
		smaller  = "smaller";
		larger   = "larger";

		px       { type = PxType;              CONTINUE; }
		pt       { type = PtType;              CONTINUE; }
		percent  { type = PercentType;         CONTINUE; }
		xxsmall  { type = PxType; value = 8;   CONTINUE; }
		xsmall   { type = PxType; value = 9;   CONTINUE; }
		small    { type = PxType; value = 10;  CONTINUE; }
		medium   { type = PxType; value = 12;  CONTINUE; }
		large    { type = PxType; value = 14;  CONTINUE; }
		xlarge   { type = PxType; value = 18;  CONTINUE; }
		xxlarge  { type = PxType; value = 24;  CONTINUE; }
		smaller  { type = RelativeSmallerType; CONTINUE; }
		larger   { type = RelativeLargerType;  CONTINUE; }

        [\000]   { BREAK;    }
        . | ws   { CONTINUE; }
*/
    }
    
	if (type == PercentType ||
        type == RelativeSmallerType ||
        type == RelativeLargerType)
    {
        return 0;
	}
    
    return value;
}


