create table if not exists Packages (
    packageID       integer primary key,
    signature       blob,
    referenceCount  integer,
    anchorPath      text
);

create table if not exists Sections (
    packageID       integer,
    packageIndex    integer,
    signature       blob,
    size            integer,
    foreign key (packageID) references Packages(packageID),
    primary key (packageID, packageIndex)
);

create table if not exists Items (
    packageID       integer,
    packageIndex    integer primary key,
    itemID          integer,
    fileURL         text,
    signature       blob,
    deviceID        integer,
    fileID          integer,
    generationID    integer,
    size            integer,
    offset          integer,
    sectionIndex    integer,
    foreign key (packageID) references Packages(packageID)
);
