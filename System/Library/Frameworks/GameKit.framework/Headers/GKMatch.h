//
//  GKMatch.h
//  GameKit
//
//  Copyright 2010 Apple, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class GKVoiceChat;

@protocol GKMatchDelegate;
@class GKPlayer;

enum {
    GKMatchSendDataReliable,         // a.s.a.p. but requires fragmentation and reassembly for large messages, may stall if network congestion occurs
    GKMatchSendDataUnreliable        // Preferred method. Best effort and immediate, but no guarantees of delivery or order; will not stall.
};
typedef NSInteger GKMatchSendDataMode;

enum {
    GKPlayerStateUnknown,       // initial player state
    GKPlayerStateConnected,     // connected to the match
    GKPlayerStateDisconnected   // disconnected from the match
};
typedef NSInteger GKPlayerConnectionState;

// GKMatch represents an active networking sessions between players. It handles network communications and can report player connection status. All matches are created by a GKMatchmaker.
@interface GKMatch : NSObject {
@private
    id  _session;
    id<GKMatchDelegate> _delegate;
    NSMutableDictionary *_playerEventQueues;
    NSUInteger          _expectedPlayerCount;
}

@property(nonatomic, readonly) NSArray *players;
@property(nonatomic, assign) id<GKMatchDelegate> delegate;
@property(nonatomic, readonly) NSUInteger expectedPlayerCount;

// Asynchronously send data to one or more players. Returns YES if delivery started, NO if unable to start sending and error will be set.
- (BOOL)sendData:(NSData *)data toPlayers:(NSArray *)players withDataMode:(GKMatchSendDataMode)mode error:(NSError **)error;
// Asynchronously broadcasts data to all players. Returns YES if delivery started, NO if unable to start sending and error will be set.
- (BOOL)sendDataToAllPlayers:(NSData *)data withDataMode:(GKMatchSendDataMode)mode error:(NSError **)error;

// Disconnect the match. This will show all other players in the match that the local player has disconnected. This should be called before releasing the match instance.
- (void)disconnect;

// Join a named voice chat channel
// Will return nil if parental controls are turned on
- (GKVoiceChat *)voiceChatWithName:(NSString *)name;

@end

@protocol GKMatchDelegate <NSObject>
@required
// The match received data sent from the player.
- (void)match:(GKMatch *)match didReceiveData:(NSData *)data fromPlayer:(GKPlayer *)player;

@optional
// The player state changed (eg. connected or disconnected)
- (void)match:(GKMatch *)match player:(GKPlayer *)player didChangeState:(GKPlayerConnectionState)state;

// The match was unable to connect with the player due to an error.
- (void)match:(GKMatch *)match connectionWithPlayerFailed:(GKPlayer *)player withError:(NSError *)error;
// The match was unable to be established with any players due to an error.
- (void)match:(GKMatch *)match didFailWithError:(NSError *)error;

@end
