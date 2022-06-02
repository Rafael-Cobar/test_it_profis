const DB = require("../mysql/connection");
const { respuestaJSON } = require("../helpers/respuestaJSON");

const getTiposCarga = (req, res) => {
    let query = `SELECT * FROM tipos_carga;`;
    try {
        DB.query(query, (err, data) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error Al obtener los tipos de Carga", err.sqlMessage));

            return res.status(200).json(respuestaJSON(false, `Tipos de Carga`, data));
        });
    } catch (error) {
        return res.status(500).json(respuestaJSON(true, "Error Al obtener los tipos de Carga", error));
    }
};

module.exports = {
    getTiposCarga,
};