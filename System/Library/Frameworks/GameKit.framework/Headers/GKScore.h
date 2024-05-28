//
//  GKScore.h
//  GameKit
//
//  Copyright 2010 Apple, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class GKPlayer;

@interface GKScore : NSObject {
    GKPlayer    *_player;
    NSInteger   _rank;
    NSInteger   _value;
    NSString    *_formattedValue;
    NSDate      *_date;
}

// Designated initializer. Will initialize the score with the local player and current date. 
- (id)init;

@property(nonatomic, readonly, retain)  GKPlayer    *player;            // The player that recorded the score.
@property(nonatomic, readonly, assign)  NSInteger   rank;               // The rank of the player within the leaderboard, only valid when returned from GKLeaderboard
@property(nonatomic, retain)            NSDate      *date;              // The date the score was recorded.
@property(nonatomic, assign)            NSInteger   value;              // The score value as an integer.
@property(nonatomic, readonly, retain)  NSString    *formattedValue;    // The score formatted as a string, localized with a label

// Report this score to the server. The value must be set, and date may be changed.
// Possible reasons for error:
// 1. Value not set
// 2. Local player not authenticated
// 3. Communications problem
- (void)reportScoreWithCompletionHandler:(void(^)(NSError *error))completionHandler;

@end
