/*
 *  CMMotionManager.h
 *  CoreMotion
 *
 *  Copyright (c) 2010 Apple Inc. All rights reserved.
 *
 */

#import <Foundation/Foundation.h>

#import <CoreMotion/CMAccelerometer.h>
#import <CoreMotion/CMGyro.h>
#import <CoreMotion/CMDeviceMotion.h>

/*
 *  CMAccelerometerHandler
 *  
 *  Discussion:
 *    Typedef of block to be invoked when accelerometer data is available.
 */
typedef void (^CMAccelerometerHandler)(CMAccelerometerData *accelerometerData, NSError *error) __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  CMGyroHandler
 *  
 *  Discussion:
 *    Typedef of block to be invoked when gyro data is available.
 */
typedef void (^CMGyroHandler)(CMGyroData *gyroData, NSError *error) __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  CMDeviceMotionHandler
 *  
 *  Discussion:
 *    Typedef of block to be invoked when device motion data is available.
 */
typedef void (^CMDeviceMotionHandler)(CMDeviceMotion *motion, NSError *error) __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  CMMotionManager
 *  
 *  Discussion:
 *    The CMMotionManager object is your entry point to the motion service.
 */
@interface CMMotionManager : NSObject
{
@private
	id _internal;
}

/*
 *  accelerometerUpdateInterval
 *  
 *  Discussion:
 *      The interval at which to deliver accelerometer data to the specified 
 *			handler once startAccelerometerUpdatesToQueue:withHandler: is called. 
 *			The units are in seconds. The value of this property is capped to 
 *			certain minimum and maximum values. The maximum value is determined by 
 *			the maximum frequency supported by the hardware. If sensitive to the 
 *			interval of acceleration data, an application should always check the 
 *			timestamps on the delivered CMAcceleration instances to determine the 
 *			true update interval. 
 */
@property(assign, nonatomic) NSTimeInterval accelerometerUpdateInterval __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  accelerometerAvailable
 *  
 *  Discussion:
 *      Determines whether accelerometer is available.
 */
@property(readonly, nonatomic, getter=isAccelerometerAvailable) BOOL accelerometerAvailable __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  accelerometerActive
 *  
 *  Discussion:
 *      Determines whether the CMMotionManager is currently providing 
 *			accelerometer updates.
 */
@property(readonly, nonatomic, getter=isAccelerometerActive) BOOL accelerometerActive __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  accelerometerData
 *  
 *  Discussion:
 *      Returns the latest sample of accelerometer data, or nil if none is available.
 */

@property(readonly) CMAccelerometerData *accelerometerData __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startAccelerometerUpdates
 *  
 *  Discussion:
 *			Starts accelerometer updates with no handler. To receive the latest accelerometer data
 *			when desired, examine the accelerometerData property.
 */
- (void)startAccelerometerUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startAccelerometerUpdatesToQueue:withHandler:
 *  
 *  Discussion:
 *			Starts accelerometer updates.
 */
- (void)startAccelerometerUpdatesToQueue:(NSOperationQueue *)queue withHandler:(CMAccelerometerHandler)handler __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  stopAccelerometerUpdates
 *  
 *  Discussion:
 *			Stop accelerometer updates.
 */
- (void)stopAccelerometerUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  gyroUpdateInterval
 *  
 *  Discussion:
 *      The interval at which to deliver gyro data to the specified 
 *			handler once startGyroUpdatesToQueue:withHandler: is called. 
 *			The units are in seconds. The value of this property is capped to 
 *			certain minimum and maximum values. The maximum value is determined by 
 *			the maximum frequency supported by the hardware. If sensitive to the 
 *			interval of gyro data, an application should always check the 
 *			timestamps on the delivered CMGyroData instances to determine the 
 *			true update interval. 
 */
@property(assign, nonatomic) NSTimeInterval gyroUpdateInterval __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  gyroAvailable
 *  
 *  Discussion:
 *      Determines whether gyro is available.
 */
@property(readonly, nonatomic, getter=isGyroAvailable) BOOL gyroAvailable __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  gyroActive
 *  
 *  Discussion:
 *      Determines whether the CMMotionManager is currently providing gyro updates.
 */
@property(readonly, nonatomic, getter=isGyroActive) BOOL gyroActive __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  gyroData
 *  
 *  Discussion:
 *		Returns the latest sample of gyro data, or nil if none is available.
 */
@property(readonly) CMGyroData *gyroData __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startGyroUpdates
 *  
 *  Discussion:
 *			Starts gyro updates with no handler. To receive the latest gyro data
 *			when desired, examine the gyroData property.
 */
- (void)startGyroUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startGyroUpdatesToQueue:withHandler:
 *  
 *  Discussion:
 *			Starts gyro updates, providing data to the given handler through the given queue.
 */
- (void)startGyroUpdatesToQueue:(NSOperationQueue *)queue withHandler:(CMGyroHandler)handler __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);


/*
 *  stopGyroUpdates
 *  
 *  Discussion:
 *			Stops gyro updates.
 */
- (void)stopGyroUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  deviceMotionUpdateInterval
 *  
 *  Discussion:
 *      The interval at which to deliver device motion data to the specified 
 *			handler once startDeviceMotionUpdatesToQueue:withHandler: is called. 
 *			The units are in seconds. The value of this property is capped to 
 *			certain minimum and maximum values. The maximum value is determined by 
 *			the maximum frequency supported by the hardware. If sensitive to the 
 *			interval of device motion data, an application should always check the 
 *			timestamps on the delivered CMDeviceMotion instances to determine the 
 *			true update interval. 
 */
@property(assign, nonatomic) NSTimeInterval deviceMotionUpdateInterval __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  deviceMotionAvailable
 *  
 *  Discussion:
 *      Determines whether device motion is available.
 */
@property(readonly, nonatomic, getter=isDeviceMotionAvailable) BOOL deviceMotionAvailable __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  deviceMotionActive
 *  
 *  Discussion:
 *      Determines whether the CMMotionManager is currently providing device
 *			motion updates.
 */
@property(readonly, nonatomic, getter=isDeviceMotionActive) BOOL deviceMotionActive __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  deviceMotion
 *  
 *  Discussion:
 *		Returns the latest sample of device motion data, or nil if none is available.
 */
@property(readonly) CMDeviceMotion *deviceMotion __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startDeviceMotionUpdates
 *  
 *  Discussion:
 *			Starts device motion updates with no handler. To receive the latest device motion data
 *			when desired, examine the deviceMotion property.
 */
- (void)startDeviceMotionUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

/*
 *  startDeviceMotionUpdatesToQueue:withHandler:
 *  
 *  Discussion:
 *			Starts device motion updates, providing data to the given handler through the given queue.
 */
- (void)startDeviceMotionUpdatesToQueue:(NSOperationQueue *)queue withHandler:(CMDeviceMotionHandler)handler __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);


/*
 *  stopDeviceMotionUpdates
 *  
 *  Discussion:
 *			Stops device motion updates.
 */
- (void)stopDeviceMotionUpdates __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_4_0);

@end
