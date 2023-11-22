CREATE TABLE transactions (
    id INT PRIMARY KEY IDENTITY(1,1),
	transactionId INT NULL,
    cardId INT,
    commerceId INT,
    transactionType NVARCHAR(50), -- 'CREDITO' o 'DEBITO'
    amount DECIMAL(10, 2),
    status NVARCHAR(50),
    processor NVARCHAR(100),
    processorType NVARCHAR(50),
    email VARCHAR(100) NOT NULL,
	currencyType VARCHAR(10),
	description VARCHAR(100) NULL,
     createdAt DATETIME NULL,
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL
);
