CREATE TABLE messages (ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
                       remote_id INTEGER,
                       date_sent INTEGER,
                       date_received INTEGER,
                       mailbox INTEGER,
                       remote_mailbox INTEGER,
                       original_mailbox INTEGER,
                       flags INTEGER,
                       read,
                       flagged,
                       deleted,
                       visible,
                       size INTEGER,
                       encoding,
                       content_type,
                       message_id,
                       conversation_id,
                       sequence_identifier INTEGER DEFAULT 0,
                       external_id TEXT);
CREATE INDEX date_index ON messages(date_received);
CREATE INDEX message_deleted_index ON messages(mailbox, deleted, date_received DESC, ROWID DESC);
CREATE INDEX message_visible_index ON messages(mailbox, visible, date_received DESC, ROWID DESC);
CREATE INDEX message_remote_mailbox_index ON messages(remote_mailbox, remote_id);
CREATE INDEX message_message_id_index ON messages(message_id);
CREATE INDEX message_conversation_id_index ON messages(conversation_id);

CREATE TABLE mailboxes (ROWID INTEGER PRIMARY KEY,
                        url UNIQUE,
                        sequence_identifier TEXT,
                        total_count INTEGER DEFAULT 0,
                        unread_count INTEGER DEFAULT 0,
                        deleted_count INTEGER DEFAULT 0);

CREATE TABLE threads (ROWID INTEGER PRIMARY KEY,
                      message_id INTEGER,
                      reference,
                      is_originator);
CREATE INDEX references_mid_reference_index ON threads(message_id, reference);
CREATE INDEX references_reference_mid_index ON threads(reference, message_id);

CREATE TABLE pop_uids(mailbox INTEGER,
                      uid TEXT,
                      date_added INTEGER,
                      flags, del, unique(mailbox, uid));
CREATE INDEX pop_uid_date_index ON pop_uids(mailbox, date_added);

CREATE TABLE message_data(ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
                          message_id INTEGER,
                          part,
                          partial,
                          complete,
                          length,
                          UNIQUE(message_id, part));
CREATE INDEX message_data_part_index ON message_data(message_id, part);

CREATE TABLE properties (ROWID INTEGER PRIMARY KEY,
                         key,
                         value,
                         UNIQUE (key));
                         
CREATE TABLE messages_deleted (message_id INTEGER PRIMARY KEY);
CREATE TABLE message_data_deleted (message_data_id INTEGER PRIMARY KEY);
