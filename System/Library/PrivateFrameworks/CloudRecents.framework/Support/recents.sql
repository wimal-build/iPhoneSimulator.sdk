CREATE TABLE recents (ROWID INTEGER PRIMARY KEY AUTOINCREMENT,
                      display_name TEXT,
                      
                      bundle_identifier TEXT,
                      property INTEGER,
                      address TEXT,
                      address_hash TEXT,
                      
                      sending_address TEXT,
                      dates TEXT NOT NULL,
                      last_date INTEGER,
                      
                      UNIQUE (bundle_identifier, address_hash)
);
CREATE INDEX recents_address_hash ON recents(bundle_identifier, address_hash, property);
CREATE INDEX recents_expunge ON recents(bundle_identifier, last_date DESC);

CREATE TABLE properties (ROWID INTEGER PRIMARY KEY,
                         key,
                         value,
                         UNIQUE (key));
