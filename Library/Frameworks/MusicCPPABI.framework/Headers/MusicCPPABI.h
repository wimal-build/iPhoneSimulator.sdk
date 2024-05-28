//
//  MusicCPPABI.h
//  MusicCPPABI
//
//  Created by Charles Magahern on 6/6/16.
//  Copyright © 2016 Apple Inc. All rights reserved.
//

#include <sys/cdefs.h>

__BEGIN_DECLS

typedef void(*MCPPABIPreprocFunc)(void *exception, void *typeinfo, void(*destructor)(void *));

extern MCPPABIPreprocFunc MCPPABIGetPreprocFunc(void);
extern MCPPABIPreprocFunc MCPPABISetPreprocFunc(MCPPABIPreprocFunc func);

__END_DECLS
