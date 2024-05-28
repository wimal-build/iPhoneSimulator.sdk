//
//  GKLeaderboard.h
//  GameKit
//
//  Copyright 2009 Apple. All rights reserved.
//

#import <Foundation/Foundation.h>

enum {
    GKLeaderboardTimeScopeToday = 0,
    GKLeaderboardTimeScopeWeek,
    GKLeaderboardTimeScopeAllTime
};
typedef NSInteger GKLeaderboardTimeScope;

enum {
    GKLeaderboardPlayerScopeGlobal = 0,
    GKLeaderboardPlayerScopeFriendsOnly
};
typedef NSInteger GKLeaderboardPlayerScope;

@class GKScore;
// GKLeaderboard represents the set of high scores for the current game, always including the local player's best score.
@interface GKLeaderboard : NSObject {
@private
    GKLeaderboardTimeScope      _timeScope;
    GKLeaderboardPlayerScope    _playerScope;
    NSArray                     *_scores;
    NSRange                     _range;
    NSArray                     *_players;
    NSUInteger                  _maxRange;
    GKScore                     *_localPlayerScore;
}

@property(nonatomic, assign)            GKLeaderboardTimeScope      timeScope;
@property(nonatomic, assign)            GKLeaderboardPlayerScope    playerScope;	// Filter on friends. Does not apply to leaderboard initialized with players.
@property(nonatomic, assign)            NSRange                     range;			// Leaderboards start at index 1 and the length should be less than 100. Does not apply to leaderboards initialized with players.
@property(nonatomic, readonly, retain)  NSArray                     *scores;		// Scores are not valid until loadScores: has completed.
@property(nonatomic, readonly, assign)  NSUInteger                  maxRange;     // The maxRange which represents the size of the leaderboard is not valid until loadScores: has completed.
@property(nonatomic, readonly, retain)  GKScore                     *localPlayerScore;  // The local player's score

// Designated initializer
// Default is the range 1-10 with Global/AllTime scopes
// if you want to change the scopes or range, set the properites before loading the scores.
- (id)init;

// Specify an array of Players, for example, the players who are in a match together
// Defaults to AllTime score, if you want to change the timeScope, set the property before loading the scores. Range and playerScope are not applicable.
- (id)initWithPlayers:(NSArray *)players;

// Load the scores for this leader board asynchronously.  Error will be nil on success.
// Possible reasons for error:
// 1. Communications problem
// 2. Unauthenticated player
- (void)loadScoresWithCompletionHandler:(void(^)(NSArray *scores, NSError *error))completionHandler;

@end
