/*
 *  CMLogItem.h
 *  CoreMotion
 *
 *  Copyright (c) 2010 Apple Inc. All rights reserved.
 *
 */

#import <Foundation/Foundation.h>


@interface CMLogItem : NSObject <NSCoding, NSCopying>
{
@private
	id _internalLogItem;
}

/*
 *  timestamp
 *  
 *  Discussion:
 *    Time at which the item is valid.
 *
 */
@property(readonly, nonatomic) NSTimeInterval timestamp __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

@end
