//
//  GKLocalPlayer.h
//  GameKit
//
//  Copyright 2009 Apple Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <GameKit/GKPlayer.h>
#import <GameKit/GKDefines.h>
@class GKInvite;

// Notification will be posted whenever authentication status changes.
GK_EXTERN NSString *GKPlayerAuthenticationDidChangeNotificationName;


GK_EXTERN_CLASS @interface GKLocalPlayer : GKPlayer
{
@private
    BOOL                    _authenticated;
    NSArray                 *_friends;
    
    NSMutableArray          *_emails;
    BOOL                    _findable;
    NSString                *_accountName;
    
    BOOL                    _updating;

    GKInvite                *_acceptedInvite;
    void(^_authenticationCompletionHandler)(NSError *error);
    UIAlertView             *_loginAlertView;
    UIWindow                *_accountWindow;
    UINavigationController  *_accountNavController;
}

// Obtain the GKLocalPlayer object.
// The player is only available for offline play until logged in.
// A temporary player is created if no account is set up.
+ (GKLocalPlayer *)localPlayer;

@property(nonatomic, readonly, getter=isAuthenticated) BOOL authenticated;  // Authentication status.

// Authenticate the player for access to player details and game statistics. This may present login UI to the user if necessary to login or create an account. The user must be autheticated in order to use other APIs. This should be called for each launch of the application as soon as the UI is ready.
// Possible reasons for error:
// 1. Communications problem
// 2. User credentials invalid
- (void)authenticateWithCompletionHandler:(void(^)(NSError *error))completionHandler;

@property(nonatomic, readwrite, copy) NSString *status;                     // Setting the status will cause it to get posted to the server

// Can be used to set the status and receive completion information. Error will be nil on success.
// Possible reasons for error:
// 1. Communications problem
// 2. Unauthenticated player
- (void)setStatus:(NSString *)status withCompletionHandler:(void(^)(NSError *error))completionHandler;

@property(nonatomic, readonly, retain) NSArray *friends;                            // Array of GKPlayer of friends of the local player. Not valid until loadFriendsWithCompletionHandler: has completed.

// Asynchronously load the friends list. Calls observer method when finished. Error will be nil on success.
// Possible reasons for error:
// 1. Communications problem
// 2. Unauthenticated player
- (void)loadFriendsWithCompletionHandler:(void(^)(NSArray *friends, NSError *error))completionHandler;

@end

