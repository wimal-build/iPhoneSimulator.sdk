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
/*!
	@header kern_memorystatus.h
	This header defines a kernel event subclass for the OSMemoryNotification API
 */

#ifndef SYS_KERN_MEMORYSTATUS_H
#define SYS_KERN_MEMORYSTATUS_H


#include <stdint.h>
#include <sys/time.h>
#include <sys/proc.h>

#define DEFAULT_JETSAM_PRIORITY -100

/*
 * Define Memory Status event subclass.
 * Subclass of KEV_SYSTEM_CLASS
 */

/*!
	@defined KEV_MEMORYSTATUS_SUBCLASS
	@discussion The kernel event subclass for memory status events.
*/
#define KEV_MEMORYSTATUS_SUBCLASS        3

enum {
	kMemoryStatusLevelNote = 1,
	kMemoryStatusSnapshotNote = 2,
	kMemoryStatusFreezeNote = 3,
	kMemoryStatusPressureNote = 4
};

enum {
	kMemoryStatusLevelAny = -1,
	kMemoryStatusLevelNormal = 0,
	kMemoryStatusLevelWarning = 1,
	kMemoryStatusLevelUrgent = 2,
	kMemoryStatusLevelCritical = 3
};

typedef struct jetsam_priority_entry {
	pid_t pid;
	uint32_t flags;
	int32_t hiwat_pages;
	int32_t priority;
	int32_t reserved;
	int32_t reserved2;
} jetsam_priority_entry_t;

typedef struct jetsam_snapshot_entry {
	pid_t pid;
	char name[MAXCOMLEN+1];
	uint32_t pages;
	uint32_t flags;
	uint8_t uuid[16];
} jetsam_snapshot_entry_t;

/*
** how many processes to snapshot
*/
#define kMaxSnapshotEntries 128 

typedef struct jetsam_kernel_stats {
	uint32_t free_pages;
	uint32_t active_pages;
	uint32_t inactive_pages;
	uint32_t throttled_pages;
	uint32_t purgeable_pages;
	uint32_t wired_pages;
} jetsam_kernel_stats_t;

/*
** This is a variable-length struct.
** Allocate a buffer of the size returned by the sysctl, cast to a jetsam_snapshot_t *
*/

typedef struct jetsam_snapshot {
	uint64_t snapshot_time;
	uint64_t notification_time;
	jetsam_kernel_stats_t stats;
	size_t entry_count;
	jetsam_snapshot_entry_t entries[1];
} jetsam_snapshot_t;

typedef struct jetsam_freeze_entry {
 	uint32_t pid;
 	uint32_t flags;
 	uint32_t pages;
} jetsam_freeze_entry_t;


enum {
	kJetsamFlagsFrontmost =        (1 << 0),
	kJetsamFlagsKilled =           (1 << 1),
	kJetsamFlagsKilledHiwat =      (1 << 2),
 	kJetsamFlagsFrozen     =       (1 << 3),
 	kJetsamFlagsKilledVnodes =     (1 << 4),
 	kJetsamFlagsKilledSwap =       (1 << 5),
  	kJetsamFlagsThawed =           (1 << 6),
  	kJetsamFlagsKilledVM =         (1 << 7),
	kJetsamFlagsSuspForDiagnosis = (1 << 8),
	kJetsamFlagsActive =           (1 << 9)
};

extern void kern_memorystatus_init(void) __attribute__((section("__TEXT, initcode")));
extern int jetsam_kill_top_proc(boolean_t any, uint32_t reason);

void kern_memorystatus_on_pid_suspend(int pid);
void kern_memorystatus_on_pid_resume(int pid);
void kern_memorystatus_on_pid_hibernate(int pid);

kern_return_t kern_memorystatus_jetsam_add(int pid, int priority, int high_water_mark);
kern_return_t kern_memorystatus_jetsam_change(boolean_t effective, int pid, int priority, int state_flags, int high_water_mark);
kern_return_t kern_memorystatus_jetsam_remove(int pid);

extern int kern_memorystatus_wakeup;
extern unsigned int kern_memorystatus_running;
extern unsigned int kern_memorystatus_available_pages;
extern unsigned int kern_memorystatus_available_pages_critical;
extern unsigned int kern_memorystatus_level;
extern unsigned int kern_memorystatus_delta;

#ifdef CONFIG_FREEZE
extern void kern_freeze_init(void) __attribute__((section("__TEXT, initcode")));
extern int kern_freeze_wakeup;
#endif

#if CONFIG_MEMORYSTATUS
#define VM_CHECK_MEMORYSTATUS do { vm_check_memorystatus(); } while(0)
#else /* CONFIG_MEMORYSTATUS */
#define VM_CHECK_MEMORYSTATUS do {} while(0)
#endif

#if VM_PRESSURE_EVENTS
int kern_memorystatus_request_vm_pressure_candidate(void);
void kern_memorystatus_send_pressure_note(int pid);
#endif

#endif /* SYS_KERN_MEMORYSTATUS_H */
