const DB = require("../mysql/connection");
const { respuestaJSON } = require("../helpers/respuestaJSON");

const getMarcas = (req, res) => {
    let query = `SELECT * FROM marcas;`;
    try {
        DB.query(query, (err, data) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error al obtener las marcas", err.sqlMessage));

            return res.status(200).json(respuestaJSON(false, `Marcas`, data));
        });
    } catch (error) {
        return res.status(500).json(respuestaJSON(true, "Error al obtener las marcas", error));
    }
};
module.exports = {
    getMarcas,
};