/*
 *  CMAttitude.h
 *  CoreMotion
 *
 *  Copyright (c) 2010 Apple Inc. All rights reserved.
 *
 */

#import <Foundation/Foundation.h>

/*
 *  CMRotationMatrix
 *  
 *  Discussion:
 *    Type represents a rotation matrix.
 */
typedef struct 
{
	double m11, m12, m13;
	double m21, m22, m23;
	double m31, m32, m33;
} CMRotationMatrix __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  CMQuaternion
 *  
 *  Discussion:
 *    Type represents a quaternion (one way of parameterizing attitude). If q
 *		is an instance of CMQuaternion, mathematically it represents the 
 *		following quaternion:
 *		q.x*i + q.y*j + q.z*k + q.w
 *		
 */
typedef struct
{
	double x, y, z, w;
} CMQuaternion __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

@interface CMAttitude : NSObject <NSCopying, NSCoding>
{
@private
	id _internal;
}

/*
 *  roll
 *  
 *  Discussion:
 *    Returns the roll of the device in radians.
 *
 */
@property(readonly, nonatomic) double roll __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  pitch
 *  
 *  Discussion:
 *    Returns the pitch of the device in radians.
 *
 */
@property(readonly, nonatomic) double pitch __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  yaw
 *  
 *  Discussion:
 *    Returns the yaw of the device in radians.
 *
 */
@property(readonly, nonatomic) double yaw __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  rotationMatrix
 *  
 *  Discussion:
 *    Returns a rotation matrix representing the device's attitude.
 *
 */
@property(readonly, nonatomic) CMRotationMatrix rotationMatrix __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  quaternion
 *  
 *  Discussion:
 *    Returns a quaternion representing the device's attitude.
 *
 */
@property(readonly, nonatomic) CMQuaternion quaternion __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  multiplyByInverseOfAttitude:
 *  
 *  Discussion:
 *      Multiplies attitude by the inverse of the specified attitude. This gives
 *			the attitude change from the specified attitude.
 */
- (void)multiplyByInverseOfAttitude:(CMAttitude *)attitude __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

@end