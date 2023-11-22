CREATE TABLE card (
    id INT PRIMARY KEY IDENTITY(1,1),
    cardToken NVARCHAR(16),
    cardNumber VARCHAR(16) NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    expirationMonth VARCHAR(2) NOT NULL,
    expirationYear VARCHAR(4) NOT NULL,
    email VARCHAR(100) NOT NULL,
    createdAt DATETIME NULL,
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL
);