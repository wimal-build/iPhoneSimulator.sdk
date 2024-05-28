/*
 *  AccessibilitySupport.h
 *  AccessibilitySupport.h
 *
 *  Copyright (c) 2009-2011 Apple Inc. All rights reserved.
 *
 */

#ifndef ACCESSIBILITY_H
#define ACCESSIBILITY_H

#include <CoreFoundation/CoreFoundation.h>

#pragma mark -
#pragma mark Preference Keys
#pragma mark -
extern CFStringRef kAXSAccessibilityPreferenceDomain;

#pragma mark Assistive Touch
// Notification center
#define UIAXASTNotificationCenter CFSTR("UIASTNotificationCenter")
#define UIAXASTKeyboardStatusUpdated CFSTR("UIAXASTKeyboardStatus")
#define UIAXASTVideoControlsUpdated CFSTR("UIAXASTVideoControlStatus")

#pragma mark AX General
extern CFStringRef kAXSAccessibilityEnabledPreference; // On if any AX option is on
extern CFStringRef kAXSApplicationAccessibilityEnabledPreference; // On if bundles should be loaded and AX runtime started
extern CFStringRef kAXSTripleClickPreference;             // the triple click preference

#pragma mark Guided Access
extern CFStringRef kAXSGuidedAccessEnabledPreference; // On if Guided Access should happen
extern CFStringRef kAXSGuidedAccessHasPasscodePreference; // Yes if Guided Access has a passcode assigned

#pragma mark Home-click Speed
#define kAXSHomeClickSpeedDefault (0.3f)
#define kAXSHomeClickSpeedSlow (0.5f)
#define kAXSHomeClickSpeedSlowest (0.7f)
extern CFStringRef kAXSHomeClickSpeedPreference;

#pragma mark Internal
extern CFStringRef kAXSReportScreenshotsPreference;
extern CFStringRef kAXSReportValidationErrorsPreference;
extern CFStringRef kAXSCrashOnValidationErrorsPreference;
extern CFStringRef kAXSAXInspectorPreference;             // On if AX inspector should be on

#pragma mark Invert Colors
extern CFStringRef kAXSInvertColorsEnabledPreference;        // On if invert display enabled

#pragma mark Other
extern CFStringRef kAXSMonoAudioEnabledPreference;        // On if mono audio enabled
extern CFStringRef kAXSScreenConstrastPreference;        // float value of screen contrast
extern CFStringRef kAXSPreferredFontSizePreference; 
extern CFStringRef kAXSDefaultRouteForCallPreference; 
extern CFStringRef kAXSLeftRightBalancePreference;
extern CFStringRef kAXSEarpieceNoiseCancellationPreference;

#pragma mark Speak Selection
extern CFStringRef kAXSQuickSpeakEnabledPreference; // On if "speak" item should appear in editing menu, and selection should be spoken
extern CFStringRef kAXSQuickSpeakLocaleForLanguagePreference;

#pragma mark Visual Alerts
extern CFStringRef kAXSVisualAlertEnabledPreference;      // On for flash screen

#pragma mark VoiceOver
extern CFStringRef kAXSVoiceOverTouchEnabledPreference; // On if VoiceOverTouch should run
extern CFStringRef kAXSVoiceOverTouchSpeakingRatePreference; //  Speaking rate VOT uses
extern CFStringRef kAXSVoiceOverTouchVolumePreference; 
extern CFStringRef kAXSVoiceOverTouchUsageConfirmedPreference;
extern CFStringRef kAXSVoiceOverTouchLanguageRotorPreference;
extern CFStringRef kAXSVoiceOverTouchEnabledThroughAccessoryPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleBluetoothDisplayPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleTableIdentifierPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleVirtualStatusAlignmentPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleMasterStatusCellIndexPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleShowDotsSevenAndEightPreference;
extern CFStringRef kAXSVoiceOverTouchBrailleContractionModePreference;
extern CFStringRef kAXSVoiceOverTouchBrailleEightDotModePreference;

#pragma mark Zoom
extern CFStringRef kAXSZoomTouchEnabledPreference; // On if ZoomTouch should run
extern CFStringRef kAXSZoomTouchToSpeakEnabledPreference;
extern CFStringRef kAXSZoomTouchToggledByVoiceOverPreference; // to keep track of whether zoom was on
extern CFStringRef kAXSZoomTouchToggledByPreferenceSwitchPreference;

#pragma mark -
#pragma mark Notification Keys
#pragma mark -

#pragma mark Assistive Touch
extern CFStringRef kAXSAssistiveTouchEnabledNotification;
extern CFStringRef kAXSAssistiveTouchScannerEnabledNotification;
extern CFStringRef kAXSAssistiveTouchSettingsChangedNotification;
extern CFStringRef kAXSAssistiveTouchCustomGestureBeginNotification;
extern CFStringRef kAXSAssistiveTouchCustomGestureEndNotification;

#pragma mark AX General
extern CFStringRef kAXSAccessibilityEnabledNotification;    
extern CFStringRef kAXSApplicationAccessibilityEnabledNotification;
extern CFStringRef kAXSTripleHomeEnabledNotification;
extern CFStringRef kAXSTripleHomeFiredNotification;

#pragma mark Guided Access
extern CFStringRef kAXSGuidedAccessEnabledNotification;
extern CFStringRef kAXSGuidedAccessHasPasscodeNotification;
// Upon receiving this, GAX will check if a passcode is enabled. If so, it will lock
// into the frontmost app.
extern CFStringRef kAXSGuidedAccessActivateNotification;

#pragma mark Home-click Speed
extern CFStringRef kAXSHomeClickEnabledNotification;
extern CFStringRef kAXSHomeClickSpeedChangedNotification;

#pragma mark Internal
extern CFStringRef kAXSReportScreenshotsNotification;
extern CFStringRef kAXSReportValidationErrorsNotification;
extern CFStringRef kAXSCrashOnValidationErrorsNotification;

#pragma mark Invert Colors
extern CFStringRef kAXSInvertColorsEnabledNotification;

#pragma mark Other
extern CFStringRef kAXSMonoAudioEnabledNotification;
extern CFStringRef kAXSHearingAidComplianceNotification;
extern CFStringRef kAXSScreenContrastChangedNotification;
extern CFStringRef kAXSPreferredFontSizeChangedNotification;
extern CFStringRef kAXSDefaultRouteChangedNotification;
extern CFStringRef kAXSClosedCaptioningChangedNotification;
extern CFStringRef kAXSPairedHearingUUIDsChangedNotification;
extern CFStringRef kAXSEarpieceNoiseCancellationEnabledNotification;

#pragma mark Speak Selection
extern CFStringRef kAXSQuickSpeakEnabledNotification; 
extern CFStringRef kAXSQuickSpeakLocaleForLanguageNotification;

#pragma mark Visual Alerts
extern CFStringRef kAXSVisualAlertEnabledNotification;

#pragma mark VoiceOver
extern CFStringRef kAXSVoiceOverTouchEnabledNotification;
extern CFStringRef kAXSAXInspectorEnabledNotification;
extern CFStringRef kAXSVoiceOverTouchSpeakingRateChangedNotification;
extern CFStringRef kAXSVoiceOverTouchVolumeChangedNotification;
extern CFStringRef kAXSVoiceOverTouchUsageConfirmedNotification;
extern CFStringRef kAXSVoiceOverTouchLanguageRotorChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleBluetoothDisplayChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleTableIdentifierChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleVirtualStatusAlignmentChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleMasterStatusCellIndexChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleContractionModeChangedNotification;
extern CFStringRef kAXSVoiceOverTouchBrailleEightDotModeChangedNotification;
extern CFStringRef kAXSVoiceOverTouchEnabledThroughAccessoryNotification;

#pragma mark Zoom
extern CFStringRef kAXSZoomTouchEnabledNotification;
extern CFStringRef kAXSZoomTouchToSpeakEnabledNotification;
extern CFStringRef kAXSZoomTouchSmoothScalingNotification;

extern CFStringRef kAXSEnhanceTextLegibilityChangedNotification;
extern CFStringRef kAXSReduceMotionChangedNotification;
extern CFStringRef kAXSEnhanceBackgroundContrastChangedNotification;
extern CFStringRef kAXSIncreaseButtonLegibilityNotification;
extern CFStringRef kAXSButtonShapesEnabledNotification;
extern CFStringRef kAXSReduceWhitePointEnabledNotification;
extern CFStringRef kAXSDarkenSystemColorsEnabledNotification;
extern CFStringRef kAXSUseDarkerKeyboardEnabledNotification;
extern CFStringRef kAXSUseSingleSystemColorNotification;

#pragma mark -
#pragma mark iTunes
#pragma mark -

extern CFStringRef kAXSiTunesAccessibilityStatusChangedNotification;
extern CFStringRef kAXSZoomTouchEnabledByiTunesPreference;
extern CFStringRef kAXSVoiceOverTouchEnabledByiTunesPreference;
extern CFStringRef kAXSInvertColorsEnabledByiTunesPreference;
extern CFStringRef kAXSMonoAudioEnabledByiTunesPreference;
extern CFStringRef kAXSSpeakAutoCorrectionsEnabledByiTunesPreference;
extern CFStringRef kAXSClosedCaptioningEnabledByiTunesPreference;

#ifdef __cplusplus
extern "C" { 
#endif
    
#pragma mark -    
#pragma mark Utility Functions
#pragma mark -
    
// This will return the non-sandboxed path to the users ax pref domain
extern CFStringRef _AXSAccessibilityPreferenceDomain();
extern CFStringRef AXCPCopySharedResourcesPreferencesDomainForDomain(CFStringRef domain);
// If you will make a series of AX pref calls, you can sync once, then disable, call, then re-enable.
extern void _AXSDisableDomainSynching(Boolean disable);
extern void _AXSForcePreferenceUpdate(CFStringRef preference);
    
// These should only be used by the iTunes lockdown mechanism (althought sometimes we need to reset
// what iTunes set)
extern void _AXSAccessibilitySetiTunesPreference(CFStringRef preference, CFTypeRef value);
extern CFTypeRef _AXSAccessibilityCopyiTunesPreference(CFStringRef preference) CF_RETURNS_RETAINED;

// This should only be used by us to determine if iTunes set a value or not.
extern Boolean _AXSAccessibilityGetBooleaniTunesPreference(CFStringRef preference, Boolean *wasSet);
    
    
#pragma mark -
#pragma mark Getters and Setters
#pragma mark -
    
#pragma mark Assistive Touch
// Most of the Assistive Touch settings have moved to AXSettings in AccessibilityUtilities, but these are here because other processes use them,
// and we don't want to force them to link AccessibilityUtilities.
extern Boolean _AXSAssistiveTouchEnabled();
extern void _AXSAssistiveTouchSetEnabled(Boolean enabled);
extern Boolean _AXSAssistiveTouchHardwareEnabled();
extern void _AXSAssistiveTouchSetHardwareEnabled(Boolean enabled);
extern Boolean _AXSAssistiveTouchUIEnabled();
extern void _AXSAssistiveTouchSetUIEnabled(Boolean enabled);
extern Boolean _AXSAssistiveTouchAlwaysShowMenu();
extern void _AXSAssistiveTouchSetAlwaysShowMenu(Boolean enabled);
extern Boolean _AXSAssistiveTouchScannerEnabled();
extern void _AXSAssistiveTouchScannerSetEnabled(Boolean enabled);

#pragma mark AX General
// Informs that an accessibility option is enabled.
extern Boolean _AXSAccessibilityEnabled();
extern void _AXSSetAccessibilityEnabled();
    
// whether accessibility bundles will be loaded or not
// NOTE: THESE SHOULD USUALLY BE PAIRED WITH VOICEOVERTOUCH METHODS
extern Boolean _AXSApplicationAccessibilityEnabled();
extern void _AXSApplicationAccessibilitySetEnabled(Boolean enabled);
extern Boolean _AXSCanDisableApplicationAccessibility();
    
typedef enum
{
    // kAXSTripleClickOptionOff           = 0,    // Also does not need to be used. _AXSTripleClickCopyOptions() will return empty array
    kAXSTripleClickOptionVoiceOver        = 1,
    kAXSTripleClickOptionInvertColors     = 2,
    kAXSTripleClickOptionAsk              = 3,       // No one should be used Ask anymore. 
    kAXSTripleClickOptionZoom             = 4,
    kAXSTripleClickOptionVoiceOverInBuddy = 5,
    kAXSTripleClickOptionAssistiveTouch   = 6,
    kAXSTripleClickOptionGuidedAccess     = 7,
    kAXSTripleClickOptionHearingControl   = 8,
    kAXSTripleClickOptionSwitchOver       = 9,
}
AXSTripleClickOption;
    
// An array of AXSTripleClickOption as CFNumberRefs
extern CFArrayRef _AXSTripleClickCopyOptions() CF_RETURNS_RETAINED;
extern void _AXSSetTripleClickOptions(CFArrayRef option);
extern Boolean _AXSTripleClickContainsOption(CFArrayRef options, AXSTripleClickOption option);
extern void _AXSTripleClickAddOption(AXSTripleClickOption option);    
    
#pragma mark Guided Access
extern void _AXSGuidedAccessStartSession();

// Returns true if Guided Access has been enabled as a feature in settings. This represents user mode / UI
// version of Guided Access. Does not indicate that Guided Access is currently active or not. 
extern Boolean _AXSGuidedAccessEnabled();
extern void _AXSGuidedAccessSetEnabled(Boolean enabled);

// Same as above but set when a MDM profile has enabled / disabled single app mode. Or app self lock
extern Boolean _AXSGuidedAccessEnabledByManagedConfiguration();
extern void _AXSGuidedAccessSetEnabledByManagedConfiguration(Boolean enabled);
    
// Ultimately indicates that Guided Access needs the AX Settings Loader to load for apps.
extern Boolean _AXSGuidedAccessRequiresApplicationAccessibility();
    
// Returns true if Guided Access currently has a passcode set. If false, it is unsafe to start a
// Guided Access session in an automated fashion
extern Boolean _AXSGuidedAccessHasPasscode();
extern void _AXSGuidedAccessSetHasPasscode(Boolean hasPasscode);
    
#pragma mark Home-click Speed
extern Boolean _AXSHomeClickEnabled();
extern float _AXSHomeClickSpeed();
extern void _AXSHomeClickSetSpeed(float speed);
    
#pragma mark Internal
extern Boolean _AXSAXInspectorEnabled();
extern void _AXSAXInspectorSetEnabled(Boolean enabled);
extern Boolean _AXSCrashOnValidationErrors();
extern void _AXSSetCrashOnValidationErrors(Boolean enabled);
extern Boolean _AXSReportScreenshots();
extern void _AXSSetReportScreenshots(Boolean enabled);
extern Boolean _AXSReportValidationErrors();
extern void _AXSSetReportValidationErrors(Boolean enabled);
    
#pragma mark Invert Colors
extern Boolean _AXSInvertColorsEnabled();
extern void _AXSInvertColorsSetEnabled(Boolean enabled);
    
#pragma mark Other
extern float _AXSScreenContrast();
extern void _AXSSetScreenContrast(float contrast);
extern void _AXSClosedCaptionsSetEnabled(Boolean flag);
extern Boolean _AXSClosedCaptionsEnabled();
    
// return _AXSPreferredFontSizeDisabled when not set
extern float kAXSPreferredFontSizeDisabled;
extern float _AXSPreferredFontSize();
extern void _AXSPreferredFontSizeSetSize(float fontSize);
extern Boolean _AXSMonoAudioEnabled();
extern void _AXSMonoAudioSetEnabled(Boolean enabled);
extern float _AXSLeftRightAudioBalance();
extern void _AXSSetLeftRightAudioBalance(float balance); // range [-1, 1], default = 0
extern Boolean _AXSHearingAidComplianceEnabled();
extern void _AXSHearingAidComplianceSetEnabled(Boolean enabled);
extern void _AXSHearingSetPairedUUIDs(CFArrayRef aids);
extern CFArrayRef _AXSHearingCopyPairedUUIDs() CF_RETURNS_RETAINED;
extern Boolean _AXSHearingAidEarIndependenceEnabled();
extern void _AXSHearingAidEarIndependenceSetEnabled(Boolean enabled);
extern Boolean _AXSEarpieceNoiseCancellationEnabled();
extern void _AXSEarpieceNoiseCancellationSetEnabled(Boolean enabled);
    
typedef enum
{
    kAXSDefaultRouteDefault = 0,
    kAXSDefaultRouteBluetoothHeadset = 1,
    kAXSDefaultRouteSpeaker = 2,  
}
AXSDefaultRouteForCall;
    
extern void _AXSSetDefaultRouteForCall(AXSDefaultRouteForCall route);
extern AXSDefaultRouteForCall _AXSDefaultRouteForCall();
    
#pragma mark Speak Selection
// Selection speak provides the ability to have selected items (via the
// editing menu) synthesized and spoken.
extern Boolean _AXSQuickSpeakEnabled();
extern void _AXSQuickSpeakSetEnabled(Boolean enabled);

extern CFDictionaryRef _AXSQuickSpeakCopyPreferredLocalesForLanguages() CF_RETURNS_RETAINED;
extern void _AXSQuickSpeakSetPreferredLocalesForLanguages(CFDictionaryRef preferredLocalesForLanguages);   
extern void _AXSQuickSpeakSetPreferredLocaleForLanguage(CFStringRef locale, CFStringRef language);
#pragma mark UIAutomation
extern void _AXSAutomationLocalizedStringLookupInfoSetEnabled(Boolean enabled);
extern Boolean _AXSAutomationLocalizedStringLookupInfoEnabled();
extern void _AXSSetAutomationEnabled(Boolean enabled);
extern Boolean _AXSAutomationEnabled();
    
#pragma mark Visual Alerts
// Flash Screen
extern Boolean _AXSVisualAlertEnabled();
extern void _AXSVisualAlertSetEnabled(Boolean enabled);
    
#pragma mark VoiceOver
extern Boolean _AXSVoiceOverTouchEnabled();
extern void _AXSVoiceOverTouchSetEnabled(Boolean enabled);
// Used by CoreAutomation proxy to turn VO on without need to tap the confirm alert
extern void _AXSVoiceOverTouchSetEnabledAndAutoConfirmUsage(Boolean enabled);
extern float _AXSVoiceOverTouchSpeakingRate();
extern void _AXSVoiceOverTouchSetSpeakingRate(float rate); // should be [0..1]
extern float _AXSVoiceOverTouchVolume();
extern void _AXSVoiceOverTouchSetVolume(float volume); // should be [0..1]
extern Boolean _AXSVoiceOverTouchUsageConfirmed();
extern void _AXSVoiceOverTouchSetUsageConfirmed(Boolean enabled);
extern Boolean _AXSVoiceOverTouchEnabledThroughAccessory();
extern void _AXSVoiceOverTouchSetEnabledThroughAccessory(Boolean enabled);
    
// An array of CFDictionaryRefs containing the items (in order).
// Each dictionary has Enabled=CFBooleanRef and RotorItem=CFStringRef (indicating language code)
extern void _AXSVoiceOverTouchSetLanguageRotorItems(CFArrayRef items);
extern CFArrayRef _AXSVoiceOverTouchCopyLanguageRotorItems(Boolean shouldUpdateIfNecessary);
extern Boolean _AXSVoiceOvierTouchLanguageRotorItemsExist();
    
// Braille related methods
extern CFDictionaryRef _AXSVoiceOverTouchCopyBrailleBluetoothDisplay() CF_RETURNS_RETAINED;
extern void _AXSVoiceOverTouchSetBrailleBluetoothDisplay(CFDictionaryRef brailleDisplay);
extern CFStringRef _AXSVoiceOverTouchCopyBrailleTableIdentifier() CF_RETURNS_RETAINED;
extern void _AXSVoiceOverTouchSetBrailleTableIdentifier(CFStringRef tableIdentifier);
extern CFIndex _AXSVoiceOverTouchBrailleVirtualStatusAlignment();
extern void _AXSVoiceOverTouchSetBrailleVirtualStatusAlignment(CFIndex statusAlignment);
extern CFIndex _AXSVoiceOverTouchBrailleMasterStatusCellIndex();
extern void _AXSVoiceOverTouchSetBrailleMasterStatusCellIndex(CFIndex index);
extern CFIndex _AXSVoiceOverTouchBrailleContractionMode();
extern void _AXSVoiceOverTouchSetBrailleContractionMode(CFIndex contractionMode);
extern Boolean _AXSVoiceOverTouchBrailleEightDotMode();
extern void _AXSVoiceOverTouchSetBrailleEightDotMode(Boolean enabled);
    
#pragma mark Zoom
extern Boolean _AXSZoomTouchEnabled();
extern void _AXSZoomTouchSetEnabled(Boolean enabled);
extern Boolean _AXSZoomTouchToggledByPreferenceSwitch();
extern void _AXSZoomTouchSetToggledByPreferenceSwitch(Boolean toggled);
extern Boolean _AXSZoomTouchToggledByVoiceOver();
extern void _AXSZoomTouchSetToggledByVoiceOver(Boolean toggled);
extern Boolean _AXSZoomTouchToSpeakEnabled();
extern void _AXSZoomTouchToSpeakSetEnabled(Boolean enabled);
extern Boolean _AXSZoomTouchSmoothScalingDisabled();
extern void _AXSZoomTouchSetSmoothScalingDisabled(Boolean enabled);

#pragma mark Text Legibility
extern Boolean _AXSEnhanceTextLegibilityEnabled();
extern void _AXSSetEnhanceTextLegibilityEnabled(Boolean enabled);
extern Boolean _AXSEnhanceTextTrackingEnabled();
extern void _AXSSetEnhanceTextTrackingEnabled(Boolean enabled);
extern Boolean _AXSEnhanceBackgroundContrastEnabled();
extern void _AXSSetEnhanceBackgroundContrastEnabled(Boolean enabled);
extern Boolean _AXSReduceMotionEnabled();
extern void _AXSSetReduceMotionEnabled(Boolean enabled);
extern Boolean _AXSIncreaseButtonLegibility();
extern void _AXSSetIncreaseButtonLegibility(Boolean enabled);
extern Boolean _AXSButtonShapesEnabled();
extern void _AXSSetButtonShapesEnabled(Boolean enabled);
extern Boolean _AXSReduceWhitePointEnabled();
extern void _AXSSetReduceWhitePointEnabled(Boolean enabled);
extern Boolean _AXSUseDarkerKeyboard();
extern void _AXSSetUseDarkerKeyboard(Boolean enabled);

extern Boolean _AXSUseSingleSystemColor();
extern void _AXSSetUseSingleSystemColor(Boolean enabled);

typedef enum {
    AXSNamedSingleColorNone,
    AXSNamedSingleColorBlue,
    AXSNamedSingleColorRed,
    AXSNamedSingleColorOrange,
    AXSNamedSingleColorGreen,
    AXSNamedSingleColorPink,
    AXSNamedSingleColorPurple,
    AXSNamedSingleColorBrown,
} AXSNamedSingleColor;

extern AXSNamedSingleColor _AXSNamedSingleSystemColor();
extern void _AXSSetNamedSingleSystemColor(AXSNamedSingleColor);
extern Boolean _AXSSingleSystemColorValues(AXSNamedSingleColor, float *red, float *green, float *blue, float *alpha);
    
extern Boolean _AXDarkenSystemColors();
extern void _AXSSetDarkenSystemColors(Boolean enabled);

#ifdef __cplusplus
}
#endif

#endif

