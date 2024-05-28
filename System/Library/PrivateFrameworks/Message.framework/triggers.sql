/*
Computing the cached counts (total_count, unread_count, deleted_count, flagged_count, etc...) must take into account
the existence of duplicate messages (two messages are considered duplicates if they have the same message_id but different rowid)
and prevent them from contributing to the count.

The strategy used is to increase the counter only if the message added / updated is the first duplicate going into that state,
and very similarly decrease the counter only when all duplicate messages have changed to the new state.

Using the unread count as example (R = read message, U = unread message):

                c0  c1  c2                  c0  c1  c2
message_1       R   U   U   message_1       U   U   R
message_2       R   R   U   message_2       U   R   R
-------------------------   -------------------------
unread_count    0   1   1   unread_count    1   1   0

In the unread_count specific case the messages that are search results are ignored (flags&128 = 0 && flags&1048576 = 0)
because they will be counted when the unread count outside the fetch window is asked to the server.
*/


DROP TRIGGER IF EXISTS after_delete_message;
DROP TRIGGER IF EXISTS after_delete_message_data;
DROP TRIGGER IF EXISTS after_add_message;
DROP TRIGGER IF EXISTS after_update_message;
DROP TRIGGER IF EXISTS after_delete_account;

CREATE TRIGGER after_delete_message AFTER DELETE ON messages
    BEGIN
        DELETE FROM threads WHERE threads.message_id = OLD.ROWID;
        DELETE FROM message_data WHERE message_id = OLD.ROWID;
        DELETE FROM message_metadata WHERE message_id = OLD.ROWID;
        INSERT INTO messages_deleted (message_id) VALUES (OLD.ROWID);

        UPDATE mailboxes
        SET total_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND mailbox = OLD.mailbox)
                            THEN total_count
                            ELSE total_count - 1
                            END
        WHERE mailboxes.ROWID = OLD.mailbox AND total_count > 0;

        UPDATE mailboxes
        SET unread_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND (flags&1 = 0 AND flags&128 = 0 AND flags&1048576 = 0) AND mailbox = OLD.mailbox)
                            THEN unread_count
                            ELSE unread_count - 1
                            END
        WHERE mailboxes.ROWID = OLD.mailbox AND (OLD.flags&1 = 0 AND OLD.flags&128 = 0 AND OLD.flags&1048576 = 0) AND unread_count > 0;

        UPDATE mailboxes
        SET deleted_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND flags&2 > 0 AND mailbox = OLD.mailbox)
                            THEN deleted_count
                            ELSE deleted_count - 1
                            END
        WHERE mailboxes.ROWID = OLD.mailbox AND OLD.flags&2 > 0 and deleted_count > 0;

        UPDATE mailboxes
        SET flagged_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND (flags&16 > 0 AND flags&2 = 0) AND mailbox = OLD.mailbox)
                            THEN flagged_count
                            ELSE flagged_count - 1
                            END
        WHERE mailboxes.ROWID = OLD.mailbox AND (OLD.flags&16 > 0 AND OLD.flags&2 = 0) AND flagged_count > 0;

        UPDATE mailboxes
        SET attachment_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND (((flags&(63<<10))>>10) BETWEEN 1 AND 62) AND flags&1 = 0 AND mailbox = OLD.mailbox)
                                THEN attachment_count
                                ELSE attachment_count - 1
                                END
        WHERE mailboxes.ROWID = OLD.mailbox AND ((((OLD.flags&(63<<10))>>10) BETWEEN 1 AND 62) AND OLD.flags&1 = 0) AND attachment_count > 0;

        UPDATE mailboxes
        SET to_cc_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = OLD.message_id AND rowid != OLD.rowid AND ((flags&(3<<39)>>39) > 0) AND flags&1 = 0 AND mailbox = OLD.mailbox)
                            THEN to_cc_count
                            ELSE to_cc_count - 1
                            END
        WHERE mailboxes.ROWID = OLD.mailbox AND ((OLD.flags&(3<<39)>>39) > 0 AND OLD.flags&1 = 0) AND to_cc_count > 0;
    END;


CREATE TRIGGER after_add_message AFTER INSERT ON messages
    BEGIN

        UPDATE mailboxes
        SET total_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND mailbox = NEW.mailbox)
                            THEN total_count
                            ELSE total_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox;

        UPDATE mailboxes
        SET unread_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (flags&1 = 0 AND flags&128 = 0 AND flags&1048576 = 0) AND mailbox = NEW.mailbox)
                            THEN unread_count
                            ELSE unread_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND new.flags&1 = 0 AND new.flags&128 = 0 AND new.flags&1048576 = 0;

        UPDATE mailboxes
        SET deleted_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND flags&2 > 0 AND mailbox = NEW.mailbox)
                            THEN deleted_count
                            ELSE deleted_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND new.flags&2 > 0;

        UPDATE mailboxes
        SET flagged_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND flags&16 > 0 AND flags&2 = 0 AND mailbox = NEW.mailbox)
                            THEN flagged_count
                            ELSE flagged_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND new.flags&16 > 0 AND new.flags&2 = 0;

        UPDATE mailboxes
        SET attachment_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (((flags&(63<<10))>>10) BETWEEN 1 AND 62) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                                THEN attachment_count
                                ELSE attachment_count + 1
                                END
        WHERE mailboxes.ROWID = new.mailbox AND (((new.flags&(63<<10))>>10) BETWEEN 1 AND 62) AND new.flags&1 = 0;

        UPDATE mailboxes
        SET to_cc_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND ((flags&(3<<39)>>39) > 0) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                            THEN to_cc_count
                            ELSE to_cc_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (new.flags&(3<<39)>>39) > 0 AND new.flags&1 = 0;
    END;


CREATE TRIGGER after_update_message AFTER UPDATE OF flags ON messages
    BEGIN

        UPDATE mailboxes
        SET unread_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND mailbox = NEW.mailbox AND (flags&1 = 0 AND flags&128 = 0 AND flags&1048576 = 0))
                           THEN unread_count
                           ELSE unread_count - 1
                           END
        WHERE mailboxes.ROWID = new.mailbox AND ((old.flags&1 = 0 AND new.flags&1 > 0) AND new.flags&128 = 0 AND new.flags&1048576 = 0) AND unread_count > 0;

        UPDATE mailboxes
        SET unread_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND mailbox = NEW.mailbox AND (flags&1 = 0 AND flags&128 = 0 AND flags&1048576 = 0))
                           THEN unread_count
                           ELSE unread_count + 1
                           END
        WHERE mailboxes.ROWID = new.mailbox AND old.flags&1 > 0 AND new.flags&1 = 0 AND new.flags&128 = 0 AND new.flags&1048576 = 0;

        UPDATE mailboxes
        SET deleted_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND flags&2 > 0 AND mailbox = NEW.mailbox)
                            THEN deleted_count
                            ELSE deleted_count - 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (old.flags&2 > 0 AND new.flags&2 = 0) AND deleted_count > 0;

        UPDATE mailboxes
        SET deleted_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND flags&2 > 0 AND mailbox = NEW.mailbox)
                            THEN deleted_count
                            ELSE deleted_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND old.flags&2 = 0 AND new.flags&2 > 0;

        UPDATE mailboxes
        SET flagged_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (flags&16 > 0 AND flags&2 = 0) AND mailbox = NEW.mailbox)
                            THEN flagged_count
                            ELSE flagged_count - 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (old.flags&16 > 0 AND old.flags&2 = 0 AND (new.flags&16 = 0 OR new.flags&2 > 0)) AND flagged_count > 0;

        UPDATE mailboxes
        SET flagged_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (flags&16 > 0 AND flags&2 = 0) AND mailbox = NEW.mailbox)
                            THEN flagged_count
                            ELSE flagged_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (new.flags&16 > 0 AND new.flags&2 = 0 AND (old.flags&16 = 0 OR old.flags&2 > 0));

        UPDATE mailboxes
        SET attachment_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (((flags&(63<<10))>>10) BETWEEN 1 AND 62) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                                THEN attachment_count
                                ELSE attachment_count - 1
                                END
        WHERE mailboxes.ROWID = new.mailbox AND ((((new.flags&(63<<10))>>10) BETWEEN 1 AND 62) AND old.flags&1 = 0 AND new.flags&1 > 0) AND attachment_count > 0;

        UPDATE mailboxes
        SET attachment_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (((flags&(63<<10))>>10) BETWEEN 1 AND 62) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                                THEN attachment_count
                                ELSE attachment_count + 1
                                END
        WHERE mailboxes.ROWID = new.mailbox AND (((new.flags&(63<<10))>>10) BETWEEN 1 AND 62) AND old.flags&1 > 0 AND new.flags&1 = 0;

        UPDATE mailboxes
        SET attachment_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND (((flags&(63<<10))>>10) BETWEEN 1 AND 62) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                                THEN attachment_count
                                ELSE attachment_count + 1
                                END
        WHERE mailboxes.ROWID = new.mailbox AND (((old.flags&(63<<10))>>10) = 0) AND (((new.flags&(63<<10))>>10) BETWEEN 1 AND 62) AND new.flags&1 = 0;

        UPDATE mailboxes
        SET to_cc_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND ((flags&(3<<39)>>39) > 0) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                            THEN to_cc_count
                            ELSE to_cc_count - 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND ((new.flags&(3<<39)>>39) > 0 AND old.flags&1 = 0 AND new.flags&1 > 0) AND to_cc_count > 0;

        UPDATE mailboxes
        SET to_cc_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND ((flags&(3<<39)>>39) > 0) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                            THEN to_cc_count
                            ELSE to_cc_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (new.flags&(3<<39)>>39) > 0 AND old.flags&1 > 0 AND new.flags&1 = 0;

        UPDATE mailboxes
        SET to_cc_count = CASE WHEN EXISTS (SELECT message_id FROM messages WHERE message_id = NEW.message_id AND rowid != NEW.rowid AND ((flags&(3<<39)>>39) > 0) AND flags&1 = 0 AND mailbox = NEW.mailbox)
                            THEN to_cc_count
                            ELSE to_cc_count + 1
                            END
        WHERE mailboxes.ROWID = new.mailbox AND (old.flags&(3<<39)>>39) = 0 AND (new.flags&(3<<39)>>39) > 0 AND new.flags&1 = 0;
    END;

CREATE TRIGGER after_delete_message_data AFTER DELETE ON message_data
    BEGIN
        INSERT INTO message_data_deleted (message_data_id) VALUES (OLD.ROWID);
    END;

CREATE TRIGGER after_delete_account AFTER DELETE ON accounts
  BEGIN
    DELETE FROM offline_cache_operations WHERE account_id = old.rowid;
    DELETE FROM offline_cache_replay_data WHERE account_id = old.rowid;
  END;
