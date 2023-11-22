
CREATE PROCEDURE DeleteOldCards
AS
BEGIN
    DELETE FROM card
    WHERE createdAt < DATEADD(MINUTE, -15, GETDATE());
END;