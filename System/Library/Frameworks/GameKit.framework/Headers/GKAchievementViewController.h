/*
 *  GKAchievementViewController.h
 *  GameKit
 *
 *  Created by Francois Bertrand on 3/22/10.
 *  Copyright 2010 Apple, Inc. All rights reserved.
 *  Starting over
 *
 */

/********************************************************************************
 
Achievements must be activated via iTC before the achievements API can be used.

********************************************************************************/



@protocol GKAchievementViewControllerDelegate
- (void)achievementViewControllerDidPressDismiss;
@end

@interface GKAchievementViewController : UINavigationController
{
    id <GKAchievementViewControllerDelegate> _achievementViewControllerDelegate;
}
- (void)setAchievementViewControllerDelegate:(id <GKAchievementViewControllerDelegate>)achievementViewControllerDelegate;
@end
