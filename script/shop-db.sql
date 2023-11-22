CREATE TABLE shops (
    commerceId INT PRIMARY KEY,
    name NVARCHAR(255),
    contactInformation NVARCHAR(255),
    active BIT,
	createdAt DATETIME NULL,
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL
);