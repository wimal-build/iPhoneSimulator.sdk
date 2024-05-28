CREATE TRIGGER after_delete_message AFTER DELETE ON messages
  BEGIN
    DELETE FROM threads WHERE threads.message_id == OLD.ROWID;
    DELETE FROM message_data WHERE message_id = OLD.ROWID;

    UPDATE mailboxes SET total_count = total_count - 1 WHERE mailboxes.ROWID = old.mailbox;
    UPDATE mailboxes SET unread_count = unread_count - 1 WHERE mailboxes.ROWID = old.mailbox AND old.flags&1 = 0;
    UPDATE mailboxes SET deleted_count = deleted_count - 1 WHERE mailboxes.ROWID = old.mailbox AND old.flags&2 > 0;
    
    INSERT INTO messages_deleted (message_id) VALUES (OLD.ROWID);
  END;

CREATE TRIGGER after_delete_message_data AFTER DELETE ON message_data
  BEGIN
    INSERT INTO message_data_deleted (message_data_id) VALUES (OLD.ROWID);
  END;
   
CREATE TRIGGER after_add_message AFTER INSERT ON messages
  BEGIN
    UPDATE mailboxes SET total_count = total_count + 1 WHERE mailboxes.ROWID = new.mailbox;
    UPDATE mailboxes SET unread_count = unread_count + 1 WHERE mailboxes.ROWID = new.mailbox AND new.flags&1 = 0;
    UPDATE mailboxes SET deleted_count = deleted_count + 1 WHERE mailboxes.ROWID = new.mailbox AND new.flags&2 > 0;
  END;

CREATE TRIGGER after_update_message AFTER UPDATE ON messages
  BEGIN
    UPDATE mailboxes SET unread_count = unread_count - 1 WHERE mailboxes.ROWID = new.mailbox AND old.flags&1 = 0 AND new.flags&1 > 0;
    UPDATE mailboxes SET unread_count = unread_count + 1 WHERE mailboxes.ROWID = new.mailbox AND old.flags&1 > 0 AND new.flags&1 = 0;
    UPDATE mailboxes SET deleted_count = deleted_count - 1 WHERE mailboxes.ROWID = new.mailbox AND old.flags&2 > 0 AND new.flags&2 = 0;
    UPDATE mailboxes SET deleted_count = deleted_count + 1 WHERE mailboxes.ROWID = new.mailbox AND old.flags&2 = 0 AND new.flags&2 > 0;
  END;
  