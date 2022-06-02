require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connection } = require("./mysql/connection");

const app = express();

// SETTINGS
app.set("port", process.env.PORT_NODEJS || 4000);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cors({ origin: "*" }));

// ROUTES
app.get("/", (req, res) => {
    res.status(200).json({ mensaje: "API Nodejs" });
});
app.use("/tiposcarga", require("./routes/tiposCarga.routes"));
app.use("/marcas", require("./routes/marcas.routes"));
app.use("/vehiculos", require("./routes/vehiculos.routes"));

// START SERVER
app.listen(app.get("port"), () => {
    console.log(`Server on Port ${app.get("port")}`);
});