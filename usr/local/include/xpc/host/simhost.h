#ifndef __XPC_LAUNCH_SIMHOST_H__
#define __XPC_LAUNCH_SIMHOST_H__

#include <Availability.h>

#include <xpc/xpc.h>
#include <stdint.h>
#include <sys/types.h>
#include <mach/mach_port.h>

#ifndef XPC_NONNULL9
#define XPC_NONNULL9 __attribute__((__nonnull__(9)))
#endif // XPC_NONNULL9

#ifndef XPC_NONNULL10
#define XPC_NONNULL10 __attribute__((__nonnull__(10)))
#endif // XPC_NONNULL10

#ifndef XPC_NONNULL11
#define XPC_NONNULL11 __attribute__((__nonnull__(11)))
#endif // XPC_NONNULL11

#define XPC_SIMHOST_SPI_VERSION 20130322
extern uint32_t xpc_simhost_spi_version;

#define LAUNCH_SPAWN_SUSPENDED (1 << 0)

// Legacy routines.
XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1
int
launch_bind_session_to_port(const char *session, mach_port_t port);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1
int
launch_register_sim_endpoint(const char *session, const char *service,
	mach_port_t port);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL2
int
launch_find_sim_endpoint(const char *session, const char *service,
	mach_port_t *port);

// Use these going forward.
XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1
int
launch_sim_bind_session_to_port(const char *session, mach_port_t port);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1
int
launch_sim_register_endpoint(const char *session, const char *service,
	mach_port_t port);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL2
int
launch_sim_find_endpoint(const char *session, const char *service,
	mach_port_t *port);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL2
const char *
launch_sim_getenv(const char *session, const char *name);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL2 XPC_NONNULL11
int
launch_sim_spawn(const char *session, const char *program, const char *argv[],
	const char *envp[], const char *cwd,
	int stdin_fd, int stdout_fd, int stderr_fd, cpu_type_t binpref,
	uint64_t flags, pid_t *pid);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL3
int
launch_sim_waitpid(const char *session, pid_t pid, int *status, uint64_t flags);

XPC_EXPORT XPC_WARN_RESULT XPC_NONNULL1 XPC_NONNULL3
int
launch_sim_set_death_handler(const char *session, dispatch_queue_t targetq,
	dispatch_block_t handler);

#endif // __XPC_LAUNCH_SIMHOST_H__
