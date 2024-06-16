//
//  CPListItemTypes.h
//  CarPlay
//
//  Copyright © 2020 Apple Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 @c CPListTemplateItem describes common properties of list items that can be displayed
 in a @c CPListTemplate.
 */
API_AVAILABLE(ios(14.0)) API_UNAVAILABLE(macos, watchos, tvos)
@protocol CPListTemplateItem <NSObject>

/**
 The primary text shown in a cell displaying this list item.
 */
@property (nullable, nonatomic, copy, readonly) NSString *text;

/**
 Any custom user info related to this item.
 */
@property (nullable, nonatomic, strong) id userInfo;

@end

/**
 @c CPListSelectable describes list items that accept a list item handler, called when
 the user selects this list item.
 */
API_AVAILABLE(ios(14.0)) API_UNAVAILABLE(macos, watchos, tvos)
@protocol CPSelectableListItem <CPListTemplateItem>

/**
 An optional action block, fired when the user selects this item in a list template.
 */
@property (nullable, nonatomic, copy) void (^handler) (id <CPSelectableListItem> item,
                                                       dispatch_block_t completionBlock);

@end

NS_ASSUME_NONNULL_END
