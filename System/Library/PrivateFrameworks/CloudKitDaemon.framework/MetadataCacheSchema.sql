
create table if not exists PushTokens (
    appBundleIdentifier       text,
    containerIdentifier       text,
    containerEnvironment      integer,
    pushToken                 blob,
    expirationDate            real,
    unique (appBundleIdentifier, containerIdentifier, containerEnvironment) on conflict replace
);

create table if not exists AppBundle (
    appBundleIdentifier       text,
    apsEnvironment            text,
    isApplication             integer,
    unique (appBundleIdentifier) on conflict replace
);

create table if not exists Container (
    containerIdentifier       text primary key,
    containerEnvironment      integer,
    publicCloudDBURL          text,
    publicShareServiceURL     text,
    publicDeviceServiceURL    text,
    scopedUserID              text,
    expirationDate            real,
    unique (containerIdentifier, containerEnvironment) on conflict replace
);

create table if not exists AppContainerIntersection (
    appBundleIdentifier       text,
    containerIdentifier       text,
    containerEnvironment      integer,
    tokenRegistered           integer,
    usesAPSPublicToken        integer,
    unique (appBundleIdentifier, containerIdentifier, containerEnvironment) on conflict replace
);

create table if not exists ServerConfiguration (
    valuesData                blob,
    expiry                    real
);
