//
//  GKVoiceChat.h
//  GameKit
//
//  Copyright 2010 Apple, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class GKPlayer;
@class GKSession;

enum{
    GKVoiceChatPlayerConnected,
    GKVoiceChatPlayerDisconnected,
    GKVoiceChatPlayerSpeaking,
    GKVoiceChatPlayerSilent
};
typedef NSInteger GKVoiceChatPlayerState;


@interface GKVoiceChat : NSObject {
@private
    id _gkVoiceChatSession;
    GKSession *_gkSession;
    void(^_playerStateUpdateHandler)(GKPlayer *, GKVoiceChatPlayerState);
}

- (void)start;
- (void)stop;

- (void)setMute:(BOOL)isMuted forPlayer:(GKPlayer *)player;

@property(nonatomic, copy) void(^playerStateUpdateHandler)(GKPlayer * player, GKVoiceChatPlayerState state);
@property(nonatomic, readonly) NSString *name;
// @property(nonatomic, readonly) NSArray *players;
@property(nonatomic, assign, getter=isActive) BOOL active; //make this session active
@property(nonatomic, assign) float volume; //default 1.0 (max is 1.0, min is 0.0)

@end
