// /src/aws-lambda/cardValidation/index.ts
export const handler = async (event: any) => {
    const { cardNumber } = JSON.parse(event.body);

    const isValid = luhnCheck(cardNumber);

    return {
        statusCode: 200,
        body: JSON.stringify({ isValid }),
    };
};

const luhnCheck = (val: string): boolean => {
    let sum = 0;
    let shouldDouble = false;

    // Recorrer los dígitos de la tarjeta desde el último hasta el primero
    for (let i = val.length - 1; i >= 0; i--) {
        let digit = parseInt(val.charAt(i));

        if (shouldDouble) {
            // Duplicar cada segundo dígito y sumar los dígitos
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        // Sumar los dígitos
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    // El número de tarjeta es válido si la suma es múltiplo de 10
    return (sum % 10) === 0;
};

