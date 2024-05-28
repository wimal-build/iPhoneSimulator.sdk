//
//  GKLeaderboardViewController.h
//  GameKit
//
//  Copyright 2010 Apple, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <GameKit/GKLeaderboard.h>

@class GKGame;
@protocol GKLeaderboardViewControllerDelegate;

// View controller that provides the standard user interface for leaderboards
@interface GKLeaderboardViewController : UINavigationController

@property (nonatomic, assign) GKLeaderboardTimeScope timeScope;
@property (nonatomic, retain) NSString *category;
@property (nonatomic, assign) id <GKLeaderboardViewControllerDelegate> leaderboardDelegate;

@end

@protocol GKLeaderboardViewControllerDelegate
@required
// The leaderboard view has finished
- (void)leaderboardViewControllerDidFinish:(GKLeaderboardViewController *)viewController;
@end
