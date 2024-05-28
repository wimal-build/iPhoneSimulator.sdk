create table if not exists Record (
    identifier             text,
    zoneIdentifier         text,
    containerIdentifier    text,
    containerScope         integer,
    containerEnvironment   integer,
    etag                   text,
    expirationDate         real,
    recordData             blob,
    knownUserKeys          blob
);

create index if not exists RecordIDIndex on Record(identifier, containerIdentifier, containerScope, containerEnvironment);
