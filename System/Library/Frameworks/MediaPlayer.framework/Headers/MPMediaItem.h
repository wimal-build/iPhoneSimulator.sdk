//
//  MPMediaItem.h
//  MediaPlayer
//
//  Copyright 2008 Apple, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <MediaPlayer/MediaPlayerDefines.h>

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_3_0

@class AVAsset, MPMediaItemArtworkInternal, MPMediaItemInternal, UIImage;

enum {
    // audio
    MPMediaTypeMusic        = 1 << 0,
    MPMediaTypePodcast      = 1 << 1,
    MPMediaTypeAudioBook    = 1 << 2,
    MPMediaTypeAnyAudio     = 0x00ff,
    
    MPMediaTypeAny          = ~0
};
typedef NSInteger MPMediaType;

// An MPMediaItem represents a single piece of media in an MPMediaLibrary.
// Media items have a unique identifier which persists across application launches.

MP_EXTERN_CLASS @interface MPMediaItem : NSObject <NSCoding> {
@private
    MPMediaItemInternal *_internal;
}

// Returns YES for item properties which can be used to construct MPMediaPropertyPredicates.
+ (BOOL)canFilterByProperty:(NSString *)property;

// Returns the value for the given item property, see the item properties listing below.
- (id)valueForProperty:(NSString *)property;

// Executes a provided block with the fetched values for the given item properties, or nil if no value is available for a property.
// In some cases, enumerating the values for multiple properties can be more efficient than fetching each individual property with -valueForProperty:.
- (void)enumerateValuesForProperties:(NSSet *)properties usingBlock:(void (^)(NSString *property, id value, BOOL *stop))block __OSX_AVAILABLE_STARTING(__MAC_NA, __IPHONE_4_0);

@end

//-----------------------------------------------------

MP_EXTERN_CLASS @interface MPMediaItemArtwork : NSObject {
@private
    MPMediaItemArtworkInternal *_internal;
}

// Returns the artwork image for an item at a given size (in points).
- (UIImage *)imageWithSize:(CGSize)size;

@property(nonatomic, readonly) CGRect bounds; // The bounds of the full size image (in points).
@property(nonatomic, readonly) CGRect imageCropRect; // The actual content area of the artwork, in the bounds of the full size image (in points).

@end

// ----------------------------------------------------

// Item properties can be used with -valueForProperty: to fetch metadata about an MPMediaItem.
// Properties marked filterable can also be used to build MPMediaPropertyPredicates (see MPMediaQuery.h).

// Media properties
MP_EXTERN NSString *const MPMediaItemPropertyPersistentID;     // @"persistentID",        NSNumber of uint64_t (unsigned long long),    filterable
MP_EXTERN NSString *const MPMediaItemPropertyMediaType;        // @"mediaType",           NSNumber of MPMediaType (NSInteger),          filterable
MP_EXTERN NSString *const MPMediaItemPropertyTitle;            // @"title",               NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyAlbumTitle;       // @"albumTitle",          NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyArtist;           // @"artist",              NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyAlbumArtist;      // @"albumArtist",         NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyGenre;            // @"genre",               NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyComposer;         // @"composer",            NSString,                                     filterable
MP_EXTERN NSString *const MPMediaItemPropertyPlaybackDuration; // @"playbackDuration",    NSNumber of NSTimeInterval (double)
MP_EXTERN NSString *const MPMediaItemPropertyAlbumTrackNumber; // @"albumTrackNumber",    NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyAlbumTrackCount;  // @"albumTrackCount",     NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyDiscNumber;       // @"discNumber",          NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyDiscCount;        // @"discCount",           NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyArtwork;          // @"artwork",             MPMediaItemArtwork
MP_EXTERN NSString *const MPMediaItemPropertyLyrics;           // @"lyrics",              NSString
MP_EXTERN NSString *const MPMediaItemPropertyIsCompilation;    // @"isCompilation",       NSNumber of BOOL,                             filterable
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_4_0
MP_EXTERN NSString *const MPMediaItemPropertyReleaseDate;      // @"releaseDate",         NSDate
MP_EXTERN NSString *const MPMediaItemPropertyBeatsPerMinute;   // @"beatsPerMinute",      NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyComments;         // @"comments",            NSString
MP_EXTERN NSString *const MPMediaItemPropertyAssetURL;         // @"assetURL",            NSURL
#endif //__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_4_0

// Podcast properties
MP_EXTERN NSString *const MPMediaItemPropertyPodcastTitle;     // @"podcastTitle",        NSString,                                     filterable

// User properties
MP_EXTERN NSString *const MPMediaItemPropertyPlayCount;        // @"playCount",           NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertySkipCount;        // @"skipCount",           NSNumber of NSUInteger
MP_EXTERN NSString *const MPMediaItemPropertyRating;           // @"rating",              NSNumber of NSUInteger, 0...5
MP_EXTERN NSString *const MPMediaItemPropertyLastPlayedDate;   // @"lastPlayedDate",      NSDate
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_4_0
MP_EXTERN NSString *const MPMediaItemPropertyUserGrouping;     // @"userGrouping",        NSString
#endif //__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_4_0

#endif // __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_3_0
