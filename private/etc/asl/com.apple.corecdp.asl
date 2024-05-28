#
# com.apple.corecdp-sim.asl
# CoreCDP
#

# Redirect all messages using the facilities "com.apple.corecdp.log.file"

? [= Facility com.apple.corecdp.log.file] claim

? [= Facility com.apple.corecdp.log.file] file $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts/cdp.log rotate=local-basic compress uid=501 gid=501 file_max=10M all_max=100M ttl=3 basestamp symlink

# Specify creation rules for our log directory.
> $ENV(SIMULATOR_LOG_ROOT)/CrashReporter/DiagnosticLogs/Accounts uid=501 gid=501 mode=0755
