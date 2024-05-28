//
//  GKLeaderboardViewController.h
//  GameKit
//
//  Copyright 2009 Apple. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <GameKit/GKLeaderboard.h>

@class GKGame, GKGameHeaderView;

@protocol GKLeaderboardViewControllerDelegate
- (void)leaderboardDidPressDismiss;
@end

@interface GKLeaderboardViewController : UINavigationController
{
    id <GKLeaderboardViewControllerDelegate> _leaderboardDelegate;
}
- (id)initWithTimeScope:(GKLeaderboardTimeScope)timeScope playerScope:(GKLeaderboardPlayerScope)playerScope;
- (void)setLeaderboardDelegate:(id <GKLeaderboardViewControllerDelegate>)leaderboardDelegate;
@end
