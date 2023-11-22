export const handler = async (event) => {
    try {
        const { cardNumber } = JSON.parse(event.body);
        const isValid = luhnCheck(cardNumber);

        return {
            statusCode: 200,
            body: JSON.stringify({ isValid }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error processing your request", error: error.message }),
        };
    }
};


const luhnCheck = (val) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = val.length - 1; i >= 0; i--) {
        let digit = parseInt(val.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
};