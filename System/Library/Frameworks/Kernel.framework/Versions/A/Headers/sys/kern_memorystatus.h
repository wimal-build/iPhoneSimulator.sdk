/*
 * Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 * @APPLE_OSREFERENCE_LICENSE_HEADER_START@
 * 
 * This file contains Original Code and/or Modifications of Original Code
 * as defined in and that are subject to the Apple Public Source License
 * Version 2.0 (the 'License'). You may not use this file except in
 * compliance with the License. The rights granted to you under the License
 * may not be used to create, or enable the creation or redistribution of,
 * unlawful or unlicensed copies of an Apple operating system, or to
 * circumvent, violate, or enable the circumvention or violation of, any
 * terms of an Apple operating system software license agreement.
 * 
 * Please obtain a copy of the License at
 * http://www.opensource.apple.com/apsl/ and read it before using this file.
 * 
 * The Original Code and all software distributed under the License are
 * distributed on an 'AS IS' basis, WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, AND APPLE HEREBY DISCLAIMS ALL SUCH WARRANTIES,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
 * Please see the License for the specific language governing rights and
 * limitations under the License.
 * 
 * @APPLE_OSREFERENCE_LICENSE_HEADER_END@
 */

#ifndef SYS_MEMORYSTATUS_H
#define SYS_MEMORYSTATUS_H

#include <stdint.h>
#include <sys/time.h>
#include <sys/proc.h>
#include <sys/param.h>

#define IDLE_JETSAM_PRIORITY             1000000000
#define DEFERRED_IDLE_JETSAM_PRIORITY    (IDLE_JETSAM_PRIORITY - 1)
#define FOREGROUND_JETSAM_PRIORITY       0
#define DEFAULT_JETSAM_PRIORITY         -100

#define DEFERRED_IDLE_EXIT_TIME_SECS     10

#define KEV_MEMORYSTATUS_SUBCLASS        3

enum {
	kMemorystatusLevelNote = 1,
	kMemorystatusSnapshotNote = 2,
	kMemorystatusFreezeNote = 3,
	kMemorystatusPressureNote = 4
};

enum {
	kMemorystatusLevelAny = -1,
	kMemorystatusLevelNormal = 0,
	kMemorystatusLevelWarning = 1,
	kMemorystatusLevelUrgent = 2,
	kMemorystatusLevelCritical = 3
};

typedef struct memorystatus_priority_entry {
	pid_t pid;
	int32_t priority;
	int32_t hiwat_pages;
	uint64_t user_data;
} memorystatus_priority_entry_t;

/*
** how many processes to snapshot
*/
#define kMaxSnapshotEntries 128 

typedef struct memorystatus_kernel_stats {
	uint32_t free_pages;
	uint32_t active_pages;
	uint32_t inactive_pages;
	uint32_t throttled_pages;
	uint32_t purgeable_pages;
	uint32_t wired_pages;
} memorystatus_kernel_stats_t;

/*
** This is a variable-length struct.
** Allocate a buffer of the size returned by the sysctl, cast to a memorystatus_snapshot_t *
*/

typedef struct jetsam_snapshot_entry {
	pid_t pid;
	char name[MAXCOMLEN+1];
	int32_t priority;
	uint32_t pages;
	uint32_t max_pages;
	uint32_t state;
	uint32_t killed;
	uint64_t user_data;
	uint8_t uuid[16];
} memorystatus_jetsam_snapshot_entry_t;

typedef struct jetsam_snapshot {
	uint64_t snapshot_time;
	uint64_t notification_time;
	memorystatus_kernel_stats_t stats;
	size_t entry_count;
	memorystatus_jetsam_snapshot_entry_t entries[];
} memorystatus_jetsam_snapshot_t;

typedef struct memorystatus_freeze_entry {
 	int32_t pid;
 	uint32_t flags;
 	uint32_t pages;
} memorystatus_freeze_entry_t;

/* State */
#define kMemorystatusSuspended        0x1
#define kMemorystatusFrozen           0x2
#define kMemorystatusWasThawed        0x4
#define kMemorystatusSupportsIdleExit 0x8
#define kMemorystatusDirty            0x10

/* Cause */
enum {
	kMemorystatusKilled = 1,
	kMemorystatusKilledHiwat,
 	kMemorystatusKilledVnodes,
  	kMemorystatusKilledVM,
  	kMemorystatusKilledPerProcessLimit,
	kMemorystatusKilledDiagnostic
};

/* Memorystatus control */
#define MEMORYSTATUS_BUFFERSIZE_MAX 65536


/* Commands */
#define MEMORYSTATUS_CMD_GET_PRIORITY_LIST            1
#define MEMORYSTATUS_CMD_SET_PRIORITY_PROPERTIES      2
#define MEMORYSTATUS_CMD_GET_JETSAM_SNAPSHOT          3
#define MEMORYSTATUS_CMD_GET_PRESSURE_STATUS          4
#define MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK   5


typedef struct memorystatus_priority_properties {
	int32_t  priority;
	uint64_t user_data;
} memorystatus_priority_properties_t;


#endif /* SYS_MEMORYSTATUS_H */
