//
//  GKPlayer.h
//  GameKit
//
//  Copyright 2009 Apple Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <GameKit/GKDefines.h>

// Notification will be posted whenever the player details changes (eg. status). The object of the notification will be the player.
GK_EXTERN NSString *GKPlayerDidChangeNotificationName;

@class UIImage;

GK_EXTERN_CLASS @interface GKPlayer : NSObject {
@package
    NSString                *_playerID;
    NSString                *_alias;
    NSString                *_status;
    BOOL                    _isFriend;
    
    //NOTE: private info follows, we could hide this in an internal object
    NSDictionary			*_avatarURLs;
    NSDictionary            *_avatarDescription;
    UIColor                 *_tintColor;
    NSMutableArray          *_cachedAvatars;

    NSString                *_firstName;
    NSString                *_lastName;

    NSString                *_friendRequestID;
    NSString                *_email;

    NSInteger               _rating;
    
    NSNumber                *numberAchievedForCurrentGame;
    NSMutableArray          *achievementsAchievedList;
    NSArray                 *achievementListFromServer;

    NSInteger               _inviteStatus;
    
    // Detail properties.
    BOOL                    hasDetailInfo;
    NSUInteger              numberOfFriends;
    NSUInteger              numberOfGamesPlayed;
    NSUInteger              numberOfAchievements;

    NSDictionary            *_lastPlayedGameDescriptor;
    NSNumber                *lastPlayedGameID;
    NSTimeInterval          lastPlayedTime;
    
    NSInvocation            *currentFriendRequestInvocation;
    
    void(^_rateCompletionHandler)(NSError *);
}

@property(nonatomic, readonly, retain)  NSString *playerID;  // Invariant player identifier.
@property(nonatomic, readonly, copy)    NSString *alias;       // The player's alias
@property(nonatomic, readonly)          BOOL isFriend;               // True if this player is a friend of the local player
@property(nonatomic, readonly, copy)    NSString *status;      // The player's status message.

@end


