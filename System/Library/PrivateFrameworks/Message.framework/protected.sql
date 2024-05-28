CREATE TABLE IF NOT EXISTS protected.messages (message_id INTEGER PRIMARY KEY,
                         sender,
                         subject,
                         _to,
                         cc,
                         bcc);
                      
CREATE TABLE IF NOT EXISTS protected.message_data (message_data_id INTEGER PRIMARY KEY,
                         data);
