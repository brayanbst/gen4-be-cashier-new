export const handler = async (event) => {
    if (!event.body || typeof event.body !== 'string') {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Petición inválida o cuerpo ausente" }),
        };
    }

    try {
        const { cardNumber } = JSON.parse(event.body);

        if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 16) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Número de tarjeta inválido" }),
            };
        }
        
        const token = generateToken(16);

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error procesando la solicitud", error: error.message }),
        };
    }
};

function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
