CREATE TABLE TransactionLogs (
    id INT PRIMARY KEY IDENTITY(1,1),
    transactionId NVARCHAR(255),
    cardId INT,
    commerceId INT,
    transactionType NVARCHAR(50), -- 'CREDITO' o 'DEBITO'
    amount DECIMAL(10, 2),
    status NVARCHAR(50),
    processor NVARCHAR(100),
    processorType NVARCHAR(50),
    transactionMessage NVARCHAR(500),
    createdAt DATETIME DEFAULT GETDATE(),
);
