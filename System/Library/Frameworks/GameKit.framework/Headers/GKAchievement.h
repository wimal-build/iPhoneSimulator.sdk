//
//  GKAchievement.h
//  GKAPI
//
//  Copyright 2009 Apple, Inc. All rights reserved.
//



/********************************************************************************
 
 Achievements must be activated via iTC before the achievements API can be used.
 
********************************************************************************/



#import <Foundation/Foundation.h>

@protocol GKAchievementDelegate;

// GKAchievement represents a game achievement that the player has started or completely achieved.
@interface GKAchievement : NSObject {
@private
    NSString *_identifier;
    NSInteger _points;
    double _percentComplete;
    BOOL _completed;
    NSDate *_lastReportedDate;
}

// Asynchronously load all achievements for the local player
+ (void)loadAchievementsWithCompletionHandler:(void(^)(NSArray *achievements, NSError *error))completionHandler;
                     
// Designate initializer
- (id)initWithIdentifier:(NSString *)identifier;

@property(nonatomic, retain) NSString *identifier;      // Achievement identifier
@property(nonatomic, assign) NSInteger points;          // Points accumulated toward this achievement. Defaults to 0.
@property(nonatomic, assign) double percentComplete;    // Optional, percentage of achievement complete, independent from points. Defaults to 0.
@property(nonatomic, assign, getter=isCompleted) BOOL completed; // Achievements can be started but not necessarily completed. Defaults to NO.
@property(nonatomic, retain) NSDate *lastReportedDate;  // Date the achievement was last reported. Defaults to current date, can be changed to reflect a past date if necessary.

// Report this achievement to the server. Points and completed state must be set. Percent complete and date are optional. Error will be nil on success.
// Possible reasons for error:
// 1. Local player not authenticated
// 2. Communications failure
- (void)reportAchievementWithCompletionHandler:(void(^)(NSError *error))completionHandler;

@end
