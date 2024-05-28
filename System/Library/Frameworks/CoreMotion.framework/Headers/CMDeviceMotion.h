/*
 *  CMDeviceMotion.h
 *  CoreMotion
 *
 *  Copyright (c) 2010 Apple Inc. All rights reserved.
 *
 */

#import <CoreMotion/CMAccelerometer.h>
#import <CoreMotion/CMAttitude.h>
#import <CoreMotion/CMGyro.h>

/*
 *  CMDeviceMotion
 *  
 *  Discussion:
 *    A CMDeviceMotion object contains basic information about the device's
 *		motion.
 */
@interface CMDeviceMotion : CMLogItem
{
@private
	id _internal;
}

/*
 *  attitude
 *  
 *  Discussion:
 *    Returns the attitude of the device.
 *
 */
@property(readonly, nonatomic) CMAttitude *attitude __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  rotationRate
 *  
 *  Discussion:
 *    Returns the rotation rate of the device.
 *
 */
@property(readonly, nonatomic) CMRotationRate rotationRate __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  gravity
 *  
 *  Discussion:
 *    Returns the gravity vector expressed in the device's reference frame. Note
 *		that the total acceleration of the device is equal to gravity plus
 *		userAcceleration.
 *
 */
@property(readonly, nonatomic) CMAcceleration gravity __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  userAcceleration
 *  
 *  Discussion:
 *    Returns the acceleration that the user is giving to the device. Note
 *		that the total acceleration of the device is equal to gravity plus
 *		userAcceleration.
 *
 */
@property(readonly, nonatomic) CMAcceleration userAcceleration __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);


@end
