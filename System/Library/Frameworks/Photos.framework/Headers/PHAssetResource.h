//
//  PHAssetResource.h
//  Photos
//
//  Copyright © 2015 Apple Inc. All rights reserved.
//

#import <Photos/PhotosTypes.h>

@class PHAsset;

NS_ASSUME_NONNULL_BEGIN

NS_CLASS_AVAILABLE_IOS(9_0) @interface PHAssetResource : NSObject

@property (nonatomic, assign, readonly) PHAssetResourceType type;
@property (nonatomic, copy, readonly) NSString *assetLocalIdentifier;
@property (nonatomic, copy, readonly) NSString *uniformTypeIdentifier;
@property (nonatomic, copy, readonly) NSString *originalFilename;

#pragma mark - Getting resources

+ (NSArray<PHAssetResource *> *)assetResourcesForAsset:(PHAsset *)asset;

@end

NS_ASSUME_NONNULL_END