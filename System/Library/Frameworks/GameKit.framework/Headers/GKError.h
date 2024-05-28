/*
 *  GKError.h
 *  GameKit
 *
 *  Copyright 2009 Apple, Inc. All rights reserved.
 *
 */

#import <UIKit/UIKit.h>

UIKIT_EXTERN NSString *GKErrorDomain;

enum {
    GKErrorUnknown = 1,
    GKErrorCancelled,
    GKErrorCommunicationsFailure,
    GKErrorUserDenied,
    GKErrorInvalidCredentials,
    GKErrorNotAuthenticated,
    GKErrorAuthenticationInProgress,
    GKErrorInvalidPlayer,
    GKErrorScoreNotSet,
    GKErrorParentalControlsBlocked,
    GKErrorPlayerStatusExceedsMaximumLength,
    GKErrorPlayerStatusInvalid,
    GKErrorMatchRequestInvalid,
    GKErrorFeatureNotAvailableInPreview,
};
typedef NSInteger GKErrorCode;

