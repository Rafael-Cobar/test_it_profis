const DB = require("../mysql/connection");
const { respuestaJSON } = require("../helpers/respuestaJSON");

/******************************************************** */
const insertVehiculo = async(req, res) => {
    const { placa, modelo, capacidad, consumo, depreciacion, id_marca } = req.body;

    // verificar si existen campos vacios
    if (!placa || !modelo || !capacidad || !consumo || !depreciacion || !id_marca)
        return res.status(200).json(respuestaJSON(true, "Datos Incompletos"));

    // verificar campos númericos
    if (isNaN(capacidad) || isNaN(consumo) || isNaN(depreciacion) || capacidad <= 0 || consumo <= 0 || depreciacion <= 0)
        return res
            .status(200)
            .json(respuestaJSON(true, "los campos capacidad, consumo y depreciacion deben ser numericos y positivos"));

    try {
        // verificar si la placa ya existe
        let queryVerificador = `SELECT id FROM vehiculos WHERE placa="${placa}";`;

        await DB.query(queryVerificador, (err, rows) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error Db", err.sqlMessage));

            if (rows.length > 0) return res.status(200).json(respuestaJSON(true, "El número de placa ya está registrado"));

            // Insertar nuevo vehiculo
            let queryInsertar = `INSERT INTO vehiculos(placa, modelo, capacidad, consumo, depreciacion, id_marca, eliminado)  VALUES ("${placa}", "${modelo}", ${capacidad}, ${consumo}, ${depreciacion}, ${id_marca}, FALSE);`;

            DB.query(queryInsertar, (err, rows) => {
                if (err) return res.status(200).send({ err: true, msg: err.sqlMessage });

                res.status(201).json(respuestaJSON(false, "Vehiculo Creado Satisfactoriamente"));
            });
        });
    } catch (error) {
        res.status(500).send(respuestaJSON(true, "Error Catch", error));
    }
};

/******************************************************** */
const getAllVehiculos = (req, res) => {
    let query = `CALL getAllVehiculos();`;
    try {
        DB.query(query, (err, data) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error Al obtener los vehiculos", err.sqlMessage));

            return res.status(200).json(respuestaJSON(false, `vehiculos`, data[0]));
        });
    } catch (error) {
        return res.status(500).json(respuestaJSON(true, "Error Al obtener los vehiculos", error));
    }
};

const getOneVehiculo = (req, res) => {
    const { id } = req.params;

    // verificar campos númericos
    if (isNaN(id)) return res.status(200).json(respuestaJSON(true, "Id debe ser campo numerico"));

    let query = `SELECT v.id, v.placa, v.modelo, v.capacidad, v.consumo, v.depreciacion, m.id "id_marca" FROM vehiculos v INNER JOIN marcas m ON m.id = v.id_marca WHERE v.id = ${id};`;

    try {
        DB.query(query, (err, data) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error al obtener el vehiculo", err.sqlMessage));

            return res.status(200).json(respuestaJSON(false, `vehiculo`, data[0]));
        });
    } catch (error) {
        return res.status(500).json(respuestaJSON(true, "Error Al obtener los vehiculos", error));
    }
};

/******************************************************** */
const deleteVehiculo = (req, res) => {
    const { id } = req.params;

    // verificar campos númericos
    if (isNaN(id)) return res.status(200).json(respuestaJSON(true, "Id debe ser campo numerico"));

    let query = `UPDATE vehiculos SET eliminado = TRUE WHERE id = ${id};`;
    try {
        DB.query(query, (err, data) => {
            if (err) return res.status(200).json(respuestaJSON(true, "Error Al eliminar el vehiculo", err.sqlMessage));

            return res.status(200).json(respuestaJSON(false, `Vehiculo Eliminado`));
        });
    } catch (error) {
        return res.status(500).json(respuestaJSON(true, "Error al eliminar", error));
    }
};

/******************************************************** */
const updateVehiculo = (req, res) => {
    const { placa, modelo, capacidad, consumo, depreciacion, id_marca } = req.body;

    // verificar si existen campos vacios
    if (!placa || !modelo || !capacidad || !consumo || !depreciacion || !id_marca)
        return res.status(200).json(respuestaJSON(true, "Datos Incompletos"));

    // verificar campos númericos
    if (isNaN(capacidad) || isNaN(consumo) || isNaN(depreciacion) || capacidad <= 0 || consumo <= 0 || depreciacion <= 0)
        return res
            .status(200)
            .json(respuestaJSON(true, "los campos capacidad, consumo y depreciacion deben ser numericos y positivos"));

    try {
        // Actualizar Vehiculo
        let query = `UPDATE vehiculos SET modelo = "${modelo}", capacidad = ${capacidad}, consumo = ${consumo}, depreciacion = ${depreciacion}, id_marca = ${id_marca} WHERE placa = "${placa}";`;

        DB.query(query, (err, rows) => {
            if (err) return res.status(200).send({ err: true, msg: err.sqlMessage });

            res.status(200).json(respuestaJSON(false, "Vehiculo Modificado Satisfactoriamente"));
        });
    } catch (error) {
        res.status(500).send(respuestaJSON(true, "Error Catch", error));
    }
};

module.exports = {
    insertVehiculo,
    getAllVehiculos,
    deleteVehiculo,
    getOneVehiculo,
    updateVehiculo,
};