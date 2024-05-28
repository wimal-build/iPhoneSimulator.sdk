CREATE TABLE messages (ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
                       remote_id INTEGER, sender,
                       subject,
                       _to,
                       cc,
                       date_sent INTEGER,
                       date_received INTEGER,
                       sort_order INTEGER,
                       mailbox INTEGER,
                       remote_mailbox INTEGER,
                       original_mailbox INTEGER,
                       flags INTEGER,
                       read,
                       flagged,
                       deleted,
                       size INTEGER,
                       color,
                       encoding,
                       content_type);
CREATE INDEX date_index ON messages(date_received);
CREATE INDEX message_mailbox_index ON messages(mailbox, deleted, date_received DESC, sort_order DESC);
CREATE INDEX message_remote_mailbox_index ON messages(remote_mailbox, remote_id);

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
CREATE INDEX references_message_id_index ON threads(message_id);
CREATE INDEX references_reference_index ON threads(reference);

CREATE TABLE pop_uids(mailbox INTEGER,
                      uid TEXT,
                      date_added INTEGER,
                      flags, del, unique(mailbox, uid));
CREATE INDEX pop_uid_date_index ON pop_uids(mailbox, date_added);

CREATE TABLE message_data(message_id INTEGER,
                          part,
                          partial,
                          complete,
                          length,
                          data,
                          UNIQUE(message_id, part));
CREATE INDEX message_data_part_index ON message_data(message_id, part);

CREATE TABLE properties (ROWID INTEGER PRIMARY KEY,
                         key,
                         value,
                         UNIQUE (key));
