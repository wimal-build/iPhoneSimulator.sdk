/*
 *  GKError.h
 *  GameKit
 *
 *  Copyright 2009 Apple, Inc. All rights reserved.
 *
 */

#import <Foundation/Foundation.h>

// domain
GK_EXTERN NSString * const GKSessionErrorDomain;

// code
typedef enum {
	GKSessionInvalidParameterError = 30500,
	GKSessionPeerNotFoundError = 30501,
	GKSessionDeclinedError = 30502,
	GKSessionTimedOutError = 30503,
	GKSessionCancelledError = 30504,
	GKSessionConnectionFailedError = 30505,
	GKSessionConnectionClosedError = 30506,
	GKSessionDataTooBigError = 30507,
	GKSessionNotConnectedError = 30508,
	GKSessionCannotEnableError = 30509,
	GKSessionInProgressError = 30510,

	GKSessionConnectivityError = 30201,
	GKSessionTransportError = 30202,
	GKSessionInternalError = 30203,
	GKSessionUnknownError = 30204,
	GKSessionSystemError = 30205
} GKSessionError;

