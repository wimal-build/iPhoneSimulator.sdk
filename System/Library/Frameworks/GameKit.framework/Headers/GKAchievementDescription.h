//
//  GKAchievementDescription.h
//  GKAPI
//
//  Copyright 2009 Apple, Inc. All rights reserved.
//


/********************************************************************************
 
 Achievements must be activated via iTC before the achievements API can be used.
 
********************************************************************************/


#import <Foundation/Foundation.h>

// GKAchievementDescription is a full description of the achievement as defined before app submission in iTunes Connect.
@interface GKAchievementDescription : NSObject {
@private
    NSString    *_identifier;
    NSString    *_title;
    NSString    *_achievedDescription;
    NSString    *_unachievedDescription;
    NSInteger   _pointMax;
    BOOL        _shouldDisplayIfNotStarted;
    NSString    *_imageURL;
    UIImage     *_image;
}

// Asynchronously load all achievement descriptions
+ (void)loadAchievementDescriptionsWithCompletionHandler:(void(^)(NSArray *descriptions, NSError *error))completionHandler;
    
+ (UIImage *)incompleteAchievementImage; // The default image for any incomplete achievement
+ (UIImage *)placeholderCompletedAchievementImage; // A placeholder image to be used for any completed achievement until the description image has loaded.

@property(nonatomic, retain) NSString *identifier;
@property(nonatomic, retain) NSString *title;                 // The title of the achievement.
@property(nonatomic, retain) NSString *achievedDescription;   // The description for an unachieved achievement.
@property(nonatomic, retain) NSString *unachievedDescription; // The description for an achieved achievement.
@property(nonatomic, assign) NSInteger maximumPoints;         // Maximum points available for completing this achievement.
@property(nonatomic, assign) BOOL shouldDisplayIfNotStarted;  // Whether or not the achievement should be listed or displayed if not yet started by the player.
@property(nonatomic, retain) UIImage *image;                  // Image for completed achievement. Not valid until loadImage: has completed.
                                                              //@property(nonatomic, retain) NSString *imageURL; // The description for an achieved achievement.

// Asynchronously load the image. Error will be nil on success.
- (void)loadImageWithCompletionHandler:(void(^)(UIImage *image, NSError *error))completionHandler;
                                          
@end
