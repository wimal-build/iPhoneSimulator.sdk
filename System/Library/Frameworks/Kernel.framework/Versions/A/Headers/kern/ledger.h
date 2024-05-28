/*
 * Copyright (c) 2010 Apple Computer, Inc. All rights reserved.
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
/*
 * @OSF_COPYRIGHT@
 */

#ifndef _KERN_LEDGER_H_
#define _KERN_LEDGER_H_

#ifdef CONFIG_LEDGER_SUPPORT
#define	LEDGER_PARAMETER
#else
#define	LEDGER_PARAMETER __unused
#endif

#define	LEDGER_UNBIND		0
#define	LEDGER_LIMIT		1
#define	LEDGER_INFO		2
#define	LEDGER_ENTRY_INFO	3

#define	LEDGER_NAME_MAX	32

struct ledger_info {
	char	li_name[LEDGER_NAME_MAX];
	int64_t	li_id;
	int64_t	li_entries;
};

struct ledger_entry_info {
	char		lei_name[LEDGER_NAME_MAX];
	uint64_t	lei_type;
        int64_t		lei_balance;
        int64_t		lei_credit;
        int64_t		lei_debit;
        uint64_t	lei_limit;
	uint64_t	lei_refill_period;	/* In milliseconds */
	uint64_t	lei_last_refill;	/* Time since last refill */
};

#define	ENTRY_TYPE_DECLINING	0x0001	/* tracks a declining resource */
#define	ENTRY_TYPE_DOUBLE	0x0002	/* tracks a fluctuating resource */
#define	ENTRY_TYPE_MASK		0x000f

#endif	/* _KERN_LEDGER_H_ */
