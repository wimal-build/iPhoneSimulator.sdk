#ifndef __XPC_VPROC_H__
#define __XPC_VPROC_H__

#ifndef __XPC_INDIRECT__
#define __XPC_INDIRECT__
#endif // __XPC_INDIRECT__

#include <xpc/base.h>
#include <Availability.h>

__BEGIN_DECLS;

#include <sys/types.h>

typedef void * vproc_err_t;
typedef void * vproc_t;
typedef void * vproc_transaction_t;

__OSX_AVAILABLE_STARTING(__MAC_10_6, __IPHONE_5_0)
XPC_EXPORT XPC_WARN_RESULT
vproc_transaction_t
vproc_transaction_begin(vproc_t virtual_proc);

__OSX_AVAILABLE_STARTING(__MAC_10_6, __IPHONE_5_0)
XPC_EXPORT XPC_NONNULL2
void
vproc_transaction_end(vproc_t virtual_proc, vproc_transaction_t handle);

__END_DECLS;

#endif // __XPC_VPROC_H__ 
