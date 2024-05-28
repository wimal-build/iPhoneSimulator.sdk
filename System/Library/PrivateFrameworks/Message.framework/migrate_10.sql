INSERT INTO messages (ROWID, remote_id, date_sent, date_received, mailbox, remote_mailbox, original_mailbox, flags, read, flagged, deleted, visible, size, encoding, content_type, message_id, conversation_id) SELECT ROWID, remote_id, date_sent, date_received, mailbox, remote_mailbox, original_mailbox, flags, read, flagged, deleted, ((0 = deleted) AND (0 = and64(flags, 1 << 7))), size, encoding, content_type, NULL, NULL from saved.messages;

INSERT INTO protected.messages (message_id, sender, subject, _to, cc) SELECT ROWID, sender, subject, _to, cc from saved.messages;

INSERT INTO message_data (ROWID, message_id, part, partial, complete, length) SELECT ROWID, message_id, part, partial, complete, length FROM saved.message_data;
INSERT INTO protected.message_data (message_data_id, data) SELECT ROWID, data from saved.message_data;

INSERT INTO mailboxes SELECT * from saved.mailboxes;
INSERT INTO pop_uids SELECT * from saved.pop_uids;