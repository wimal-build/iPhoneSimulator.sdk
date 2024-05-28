create table if not exists AssetHandle (
    itemID integer primary key,
    UUID text not null,
    deviceID integer,
    fileID integer,
    generationID integer,
    lastUsedDate real not null,
    fileURL text);

create index if not exists AssetHandleUUIDIndex on AssetHandle (UUID);
