//
//  QLPreviewController.h
//  Mobile Quick Look
//
//  Copyright 2008 Apple Inc. All rights reserved.
//


#import <UIKit/UIKit.h>

@protocol QLPreviewItem;
@protocol QLPreviewControllerDelegate;
@protocol QLPreviewControllerDataSource;

@class QLPreviewControllerReserved;

@interface QLPreviewController : UIViewController <UIDocumentInteractionControllerDelegate> {
    QLPreviewControllerReserved * _reserved;
}

/*!
 * @abstract Returns YES if QLPreviewController can display this preview item.
 */
+ (BOOL)canPreviewItem:(id <QLPreviewItem>)item;

/*
 * Acessing the previewed items
 */

/*!
 * @abstract The Preview Panel data source.
 */
@property(assign) id <QLPreviewControllerDataSource> dataSource;

/*!
 * @abstract Asks the Preview Controller to reload its data from its data source.
 * @discussion This method does not refresh the visible item if it has not changed.
 */
- (void)reloadData;

/*!
 * @abstract Asks the Preview Controller to recompute the preview of the currently previewed item.
 */
- (void)refreshCurrentPreviewItem;

/*!
 * @abstract The index of the currently previewed item in the preview panel or NSNotFound if there is none.
 */
@property NSInteger currentPreviewItemIndex;

/*!
 * @abstract The currently previewed item in the preview panel or nil if there is none.
 */
@property(readonly) id <QLPreviewItem> currentPreviewItem;



/*
 * Setting the delegate
 */

/*!
 * @abstract The Preview Controller delegate.
 * @discussion Should implement the <QLPreviewControllerDelegate> protocol
 */
@property(assign) id delegate;

@end


/*!
 * @abstract The QLPreviewControllerDataSource protocol declares the methods that the Preview Controller uses to access the contents of its data source object.
 */
@protocol QLPreviewControllerDataSource

@required

/*!
 * @abstract Returns the number of items that the preview controller should preview.
 * @param controller The Preview Controller.
 * @result The number of items.
 */
- (NSInteger)numberOfPreviewItemsInPreviewController:(QLPreviewController *)controller;

/*!
 * @abstract Returns the item that the preview controller should preview.
 * @param panel The Preview Controller.
 * @param index The index of the item to preview.
 * @result An item conforming to the QLPreviewItem protocol.
 */
- (id <QLPreviewItem>)previewController:(QLPreviewController *)controller previewItemAtIndex:(NSInteger)index;

@end




@protocol QLPreviewControllerDelegate <NSObject>
@optional

/*!
 * @abstract Invoked before the preview controller is closed.
 */
- (void)previewControllerWillDismiss:(QLPreviewController *)controller;

/*!
 * @abstract Invoked after the preview controller is closed.
 */
- (void)previewControllerDidDismiss:(QLPreviewController *)controller;

/*!
 * @abstract Invoked by the preview controller before trying to open an URL tapped in the preview.
 * @result Returns NO to prevent the preview controller from calling -[UIApplication openURL:] on url.
 * @discussion If not implemented, defaults is YES.
 */
- (BOOL)previewController:(QLPreviewController *)controller shouldOpenURL:(NSURL *)url forPreviewItem:(id <QLPreviewItem>)item;


@end


