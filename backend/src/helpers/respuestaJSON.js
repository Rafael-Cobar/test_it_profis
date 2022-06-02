/*
    ? respuestaJSON = respuesta que enviara el backend en formato JSON al frontend
    parametros:
        error = booleano
        mensaje = string
        data = cualquier tipo de dato
*/
const respuestaJSON = (error, mensaje, data = null) => {
    return { error, mensaje, data };
};

module.exports = {
    respuestaJSON,
};