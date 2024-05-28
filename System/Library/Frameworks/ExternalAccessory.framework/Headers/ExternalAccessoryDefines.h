//
//  ExternalAccessoryDefines.h
//  ExternalAccessory
//
//  Copyright 2008 Apple, Inc. All rights reserved.
//

#ifdef __cplusplus
#define EA_EXTERN	 extern "C" __attribute__((visibility ("default")))
#else // #ifdef __cplusplus
#define EA_EXTERN	 extern __attribute__((visibility ("default")))
#endif // #ifdef __cplusplus

#define EA_EXTERN_CLASS __attribute__((visibility("default")))
