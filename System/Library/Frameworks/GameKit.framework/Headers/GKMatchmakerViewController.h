/*
 *  GKMatchmakerViewController.h
 *  GameKit
 *
 *  Copyright 2010 Apple. All rights reserved.
 *
 */

#import <UIKit/UIKit.h>

@class GKMatchRequest;
@class GKInvite;
@class GKMatch;
@class GKSession;
@class GKConnection;
@class GKReachability;
@class GKFriendPickerViewController;
@protocol GKMatchmakerViewControllerDelegate;

// View controller to invite friends, respond to invites, and perform genius matchmaking
@interface GKMatchmakerViewController : UIViewController {
@private
    id<GKMatchmakerViewControllerDelegate> _delegate;
    GKMatchRequest *_matchRequest;
    GKInvite *_acceptedInvite;
    BOOL _hosted;

    GKReachability *_reachability;
    BOOL _reachable;
    GKSession *_session;
    GKConnection *_connection;
    BOOL _loadingFriends;
    BOOL _sentAccept;
    BOOL _geniusMatching;

    UINavigationBar *_navBar;
    UIView *_navView;
    UILabel *_navTitleLabel;
    UILabel *_navPlayersLabel;
    UIActivityIndicatorView *_navSpinner;
    UIView *_matchingView;
    UIView *_backgroundView;
    UITableView *_friendTable;
    UILabel *_footerLabel;
    UIView *_addRemovePlayersView;
    UIButton *_addPlayerButton;
    UIButton *_removePlayerButton;
    NSMutableArray *_invitedFriends;
    NSMutableDictionary *_avatarImages;
    NSMutableDictionary *_ranks;
    NSMutableArray *_friendPlayers;
    NSArray *_playersToInvite;
    NSInteger _numberOfInvitesRemaining;
    NSInteger _numberAccepted;
    NSInteger _cancelIndex;
    GKFriendPickerViewController *_friendPicker;
    UINavigationController *_friendNavController;
}

@property(nonatomic, assign) id<GKMatchmakerViewControllerDelegate> delegate;
@property(nonatomic, readonly, retain) GKMatchRequest *matchRequest;
@property(nonatomic, assign, getter=isHosted) BOOL hosted;  // set to YES to receive hosted (eg. not peer-to-peer) match results. Will cause the controller to return an array of players instead of a match.

// Initialize with a matchmaking request, allowing the user to send invites and/or start matchmaking
- (id)initWithMatchRequest:(GKMatchRequest *)request;

// Initialize with a matchmaking request and preselect the given friends, allowing the user to send invites and/or start matchmaking
- (id)initWithMatchRequest:(GKMatchRequest *)request playersToInvite:(NSArray *)players;

// Initialize with an invite, allowing the user to see the status of other invited players and get notified when the game starts
- (id)initWithInvite:(GKInvite *)invite;


// Update the status of a server-hosted player to ready, this should be called once an invited player has connected to the app's server
- (void)setHostedPlayerReady:(GKPlayer *)player;

@end

@protocol GKMatchmakerViewControllerDelegate <NSObject>
@required
// The user has cancelled matchmaking
- (void)matchmakerViewControllerWasCancelled:(GKMatchmakerViewController *)viewController;

// Matchmaking has failed with an error
- (void)matchmakerViewController:(GKMatchmakerViewController *)viewController didFailWithError:(NSError *)error;

@optional
// A peer-to-peer match has been created, the game should start
- (void)matchmakerViewController:(GKMatchmakerViewController *)viewController didCreateMatch:(GKMatch *)match;

// Players have been found for a server-hosted game, the game should start
- (void)matchmakerViewController:(GKMatchmakerViewController *)viewController didFindPlayers:(NSArray *)players;
@end

