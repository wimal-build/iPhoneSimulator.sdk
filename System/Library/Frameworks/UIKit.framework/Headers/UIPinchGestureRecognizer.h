//
//  UIPinchGestureRecognizer.h
//  UIKit
//
//  Copyright 2008-2010 Apple Inc. All rights reserved.
//

#if __IPHONE_3_2 <= __IPHONE_OS_VERSION_MAX_ALLOWED

#import <CoreGraphics/CoreGraphics.h>
#import <UIKit/UIGestureRecognizer.h>

// Begins:  when two touches have moved enough to be considered a pinch
// Changes: when a finger moves while two fingers remain down
// Ends:    when both fingers have lifted

UIKIT_EXTERN_CLASS @interface UIPinchGestureRecognizer : UIGestureRecognizer {
  @package
    CGFloat           _initialTouchDistance;
    CGFloat           _initialTouchScale;
    NSTimeInterval    _lastTouchTime;
    CGFloat           _velocity;
    CGFloat           _previousVelocity;
    CGFloat           _scaleThreshold;
    CGAffineTransform _transform;
    CGPoint           _anchorPoint;
    UITouch          *_touches[2];
    unsigned int      _scrollViewGesture:1;
    unsigned int      _hasParentScrollView:1;
}

@property (nonatomic)          CGFloat scale;               // scale relative to the touch points in screen coordinates
@property (nonatomic,readonly) CGFloat velocity;            // velocity of the pinch in scale/second

@end

#endif
