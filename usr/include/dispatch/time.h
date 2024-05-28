/*
 * Copyright (c) 2008-2009 Apple Inc. All rights reserved.
 */

#ifndef __DISPATCH_TIME__
#define __DISPATCH_TIME__

#ifndef __DISPATCH_INDIRECT__
#error "Please #include <dispatch/dispatch.h> instead of this file directly."
#include <dispatch/base.h> // for HeaderDoc
#endif

#include <stdint.h>

__BEGIN_DECLS

struct timespec;

// 6368156
#ifdef NSEC_PER_SEC
#undef NSEC_PER_SEC
#endif
#ifdef USEC_PER_SEC
#undef USEC_PER_SEC
#endif
#ifdef NSEC_PER_USEC
#undef NSEC_PER_USEC
#endif
#define NSEC_PER_SEC 1000000000ull
#define USEC_PER_SEC 1000000ull
#define NSEC_PER_USEC 1000ull

/*!
 * @typedef dispatch_time_t
 *
 * @abstract
 * An somewhat abstract representation of time; where zero means "now" and
 * DISPATCH_TIME_FOREVER means "infinity" and every value in between is an
 * opaque encoding.
 */
typedef uint64_t dispatch_time_t;

#define DISPATCH_TIME_NOW 0
#define DISPATCH_TIME_FOREVER (~0ull)

/*!
 * @function dispatch_time
 *
 * @abstract
 * Create dispatch_time_t relative to the default clock or modify an existing
 * dispatch_time_t.
 *
 * @discussion
 * On Mac OS X the default clock is based on mach_absolute_time().
 *
 * @param when
 * An optional dispatch_time_t to add nanoseconds to. If zero is passed, then
 * dispatch_time() will use the result of mach_absolute_time().
 *
 * @param delta
 * Nanoseconds to add.
 *
 * @result
 * A new dispatch_time_t.
 */
__OSX_AVAILABLE_STARTING(__MAC_10_6,__IPHONE_3_2)
DISPATCH_NOTHROW
dispatch_time_t
dispatch_time(dispatch_time_t when, int64_t delta);

/*!
 * @function dispatch_walltime
 *
 * @abstract
 * Create a dispatch_time_t using the wall clock.
 *
 * @discussion
 * On Mac OS X the wall clock is based on gettimeofday(3).
 *
 * @param when
 * A struct timespect to add time to. If NULL is passed, then
 * dispatch_walltime() will use the result of gettimeofday(3).
 *
 * @param delta
 * Nanoseconds to add.
 *
 * @result
 * A new dispatch_time_t.
 */
__OSX_AVAILABLE_STARTING(__MAC_10_6,__IPHONE_3_2)
DISPATCH_NOTHROW
dispatch_time_t
dispatch_walltime(const struct timespec *when, int64_t delta);

__END_DECLS

#endif
