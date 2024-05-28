/*
 *  GKAchievementViewController.h
 *  GameKit
 *
 *  Copyright 2010 Apple, Inc. All rights reserved.
 */

#import <UIKit/UIKit.h>

@protocol GKAchievementViewControllerDelegate;

// View controller that provides the standard user interface for achievements
@interface GKAchievementViewController : UINavigationController

// Optional delegate
@property (nonatomic, assign) id<GKAchievementViewControllerDelegate> achievementDelegate;

@end

// Optional delegate
@protocol GKAchievementViewControllerDelegate
@required
// The achievement view has finished
- (void)achievementViewControllerDidFinish:(GKAchievementViewController *)viewController;
@end
