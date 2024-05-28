//
//  EKEventViewController.h
//  EventKitUI
//
//  Copyright 2009-2010 Apple Inc. All rights reserved.
//

#if __IPHONE_4_0 <= __IPHONE_OS_VERSION_MAX_ALLOWED

#import <UIKit/UIKit.h>

@class EKEvent, EKEventStore;

/*!
    @class      EKEventViewController
    @abstract   View controller to view event detail.
    @discussion You can use this view controller to display the details of an event. You
                can also optionally choose to allow the user to edit the event by displaying
                an edit button. While you can use this view controller to display events that
                have not been saved, the edit button will not appear in this situation. If
                you have pushed this view controller onto a navigation controller stack, and
                the underlying event gets deleted, this controller will remove itself from
                the stack and clear its event property.
*/
@interface EKEventViewController : UIViewController <UIActionSheetDelegate> {
@private
    EKEventStore           *_store;
    EKEvent                *_event;
    NSString               *_eventId;
    unsigned                _options;
    id                      _editor;
    UIActionSheet*          _alertSheet;
    int                     _pendingStatus;
    id                      _internal;
    BOOL                    _didAppear;
    BOOL                    _autoPop;
}


/*!
    @property   event
    @abstract   Specifies the event to view.
    @discussion You must set this prior to displaying the view controller.
*/
@property(nonatomic, retain) EKEvent *event;

/*!
    @property   allowsEditing
    @abstract   Determines whether Edit button can be shown. 
    @discussion Note that even if this is enabled, the edit button may not appear if this event
                is in a read-only calendar, such as a subscribed calendar. It may also not appear
                if the event was not created by the current user (i.e. it's an event they were
                invited to). And lastly, if the event was never saved, the edit button will not
                appear.
*/
@property(nonatomic) BOOL      allowsEditing;

/*!
    @property   allowsCalendarPreview
    @abstract   Determines whether event can be shown in calendar day view preview.
    @discussion This option only affects calendar invites at present. If the event is an invite,
                and this option is set, a table cell will appear that allows the user to preview 
                the event along with their other events for the day.
*/
@property(nonatomic) BOOL      allowsCalendarPreview;

@end

#endif // #if __IPHONE_4_0 <= __IPHONE_OS_VERSION_MAX_ALLOWED
