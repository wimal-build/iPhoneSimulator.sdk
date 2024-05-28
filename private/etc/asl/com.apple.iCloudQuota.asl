#
# com.apple.iCloudQuota.asl
# iCloudQuota
#
# Created by WayneLoofbourrow on 11/30/2015.
# Original by Lestat Ali on 11/20/2014.
# Copyright (c) 2014 Apple Inc. All rights reserved.
#


# Redirect all messages using the facilities "com.apple.iCloudQuota.log.file"
# and "com.apple.iCloudQuota.traffic.log.file"to our log files.

? [= Facility com.apple.iCloudQuota.log.file] claim
? [= Facility com.apple.iCloudQuota.traffic.log.file] claim

? [= Facility com.apple.iCloudQuota.log.file] file $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts/iCloudQuota.log rotate=iCloudQuota.local-basic.log compress uid=501 gid=501 file_max=10M all_max=100M ttl=3 basestamp symlink

? [= Facility com.apple.iCloudQuota.traffic.log.file] file $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts/iCloudQuotaTraffic.log rotate=iCloudQuotaTraffic.local-basic.log compress uid=501 gid=501 file_max=10M all_max=100M ttl=3 basestamp symlink

# Specify creation rules for our log directory.
> $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts uid=501 gid=501 mode=0755
