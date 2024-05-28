//
//  GKMatchmaker.h
//  GameKit
//
//  Copyright 2009 Apple Inc. All rights reserved.
//


#import <UIKit/UIKit.h>
@class GKConnection;
@class GKSession;
@class GKPlayer;
@class GKMatch;
@class GKMatchmakerViewController;
@class GKMatchPlayersDataRequest;

// GKMatchRequest represents the parameters needed to create the match.
@interface GKMatchRequest : NSObject {
@private
    NSUInteger _minPlayers;
    NSUInteger _maxPlayers;
    NSUInteger _playerGroup;
}
@property(nonatomic, assign) NSUInteger minPlayers;     // Minimum number of players for the match
@property(nonatomic, assign) NSUInteger maxPlayers;     // Maximum number of players for the match
@property(nonatomic, assign) NSUInteger playerGroup;    // The player group identifier. Matchmaking will only take place between players in the same group.
@end

// GKInvite represents an accepted game invite, it is used to create a GKMatchmakerViewController
@interface GKInvite : NSObject {
@private
    NSString *_inviteID;
    NSString *_message;
    GKPlayer *_inviter;
    NSData   *_originatorToken;
    NSData   *_connectionData;
    BOOL     _hosted;
    BOOL     _cancelled;
}
@property(nonatomic, readonly, retain) GKPlayer *inviter;
@property(nonatomic, readonly, getter=isHosted) BOOL hosted;
@property(nonatomic, readonly, getter=isCancelled) BOOL cancelled;
@end


// provides an interface to find other players for a multiplayer game session
@interface GKMatchmaker : NSObject {
@private
    GKMatchPlayersDataRequest   *_matchPlayersDataRequest;
    void(^_inviteHandler)(GKInvite *);
}

// singleton
+ (GKMatchmaker*)sharedMatchmaker;

// To receive game invites an inviteHandler must be set. The inviteHandler will be called when an invite is received. It may be called immediately if there is a pending invite when the application is launched. The inviteHandler may be called multiple times.
- (void)setInviteHandler:(void(^)(GKInvite *invite))inviteHandler;
- (void(^)(GKInvite *))inviteHandler;

// Genius matchmaking to create a peer-to-peer match for the specified request. Error will be nil on success:
// Possible reasons for error:
// 1. Communications failure
// 2. Unauthenticated player
// 3. Timeout
- (void)createMatchForRequest:(GKMatchRequest *)request withCompletionHandler:(void(^)(GKMatch *match, NSError *error))completionHandler;

// Matchmaking for host-client match request. This returns a list of players to be included in the match. Determination and communication with the host is not part of this API.
// Possible reasons for error:
// 1. Communications failure
// 2. Unauthenticated player
// 3. Timeout
- (void)findPlayersForHostedMatchRequest:(GKMatchRequest *)request withCompletionHandler:(void(^)(NSArray *players, NSError *error))completionHandler;

- (void)addPlayersToMatch:(GKMatch *)match matchRequest:(GKMatchRequest *)matchRequest completionHandler:(void (^)(NSError *))completionHandler;

// Cancel matchmaking
- (void)cancel;

// Query the server for recent activity in the specified player group. A larger value indicates that a given group has seen more recent activity. Error will be nil on success.
// Possible reasons for error:
// 1. Communications failure
- (void)queryPlayerGroupActivity:(NSUInteger)playerGroup withCompletionHandler:(void(^)(NSInteger activity, NSError *error))completionHandler;

@end
