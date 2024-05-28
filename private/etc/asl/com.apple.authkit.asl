#
# com.apple.authkit.asl
# AuthKit
#
# Created by Lestat Ali on 11/20/2014.
# Copyright (c) 2014 Apple Inc. All rights reserved.
#


# Redirect all messages using the facilities "com.apple.authkit.log.file"
# and "com.apple.authkit.traffic.log.file"to our log files.

? [= Facility com.apple.authkit.log.file] claim
? [= Facility com.apple.authkit.traffic.log.file] claim

? [= Facility com.apple.authkit.log.file] file $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts/authkit.log rotate=local-basic compress uid=501 gid=501 file_max=10M all_max=100M ttl=3 basestamp symlink

? [= Facility com.apple.authkit.traffic.log.file] file $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts/appleidtraffic.log rotate=local-basic compress uid=501 gid=501 file_max=10M all_max=100M ttl=3 basestamp symlink

# Specify creation rules for our log directory.
> $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts uid=501 gid=501 mode=0755
