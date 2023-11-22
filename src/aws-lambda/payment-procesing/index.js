export const handler = async (event) => {
    const { datosTarjeta, datosTransaccion } = JSON.parse(event.body);

    const resultado = procesarPago(datosTarjeta, datosTransaccion);

    return {
        statusCode: 200,
        body: JSON.stringify(resultado),
    };
};

function procesarPago(datosTarjeta, datosTransaccion) {
   if (!validarTarjeta(datosTarjeta)) {
        return { exito: false, mensaje: "Datos de tarjeta inválidos" };
    }

    if (datosTransaccion.amount <= 0) {
        return { exito: false, mensaje: "El monto de la transacción debe ser mayor a 0" };
    }

    const respuestaTransaccion = {
        success: true,
        message: "Transacción procesada exitosamente",
        details: {
            amount: datosTransaccion.amount,
            transactionType: datosTransaccion.transactionType,
            status: "Processing",
            processor: datosTransaccion.processor,
            processorType: datosTransaccion.processorType,
            currencyType: datosTransaccion.currencyType,
            description: datosTransaccion.description,
            transactionDate: new Date().toISOString() 
        }
    };

    return respuestaTransaccion;
}

function validarTarjeta({ cardToken, cvv, expirationMonth, expirationYear, email }) {
   
    if (!cardToken || !cvv || !expirationMonth || !expirationYear || !email) {
        return false;
    }
   
    return true;
}