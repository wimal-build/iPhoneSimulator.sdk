/*
 *  CMAccelerometer.h
 *  CoreMotion
 *
 *  Copyright (c) 2010 Apple Inc. All rights reserved.
 *
 */

#import <Foundation/Foundation.h>

#import <CoreMotion/CMLogItem.h>


/*
 *  CMAcceleration
 *  
 *  Discussion:
 *    A structure containing 3-axis acceleration data.
 *
 *  Fields:
 *    x:
 *      X-axis acceleration in G's.
 *    y:
 *      Y-axis acceleration in G's.
 *		z:
 *			Z-axis acceleration in G's.
 */
typedef struct {
	double x;
	double y;
	double z;
} CMAcceleration __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  CMAccelerometerData
 *  
 *  Discussion:
 *    Contains a single accelerometer measurement.
 *
 */
@interface CMAccelerometerData : CMLogItem
{
@private
	id _internal;
}

/*
 *  acceleration
 *  
 *  Discussion:
 *    The acceleration measured by the accelerometer.
 *
 */
@property(readonly, nonatomic) CMAcceleration acceleration __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

@end