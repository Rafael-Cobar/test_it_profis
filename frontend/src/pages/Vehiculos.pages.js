import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VehiculoTable from "../components/VehiculoTable";
import { helpHttp } from "../helpers/helpHttp";

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  let navigate = useNavigate();

  const setEditar = (id) => {
    navigate(`/vehiculos/edit/${id}`);
  };

  const eliminarVehiculo = (id) => {
    let isDelete = window.confirm(`are you sure to delete the register with id=${id}`);

    if (isDelete) {
      let endpointDelete = `vehiculos/${id}`;

      let options = {
        headers: { "content-type": "application/json" },
      };

      helpHttp()
        .deleteData(endpointDelete, options)
        .then((res) => {
          if (!res.err) {
            if (res.error) return;
            let newData = vehiculos.filter((el) => el.id !== id);
            setVehiculos(newData);
          }
        });
    }
    return;
  };

  useEffect(() => {
    helpHttp()
      .getData("vehiculos")
      .then((res) => {
        if (!res.err) {
          if (!res.error) setVehiculos(res.data);
        } else {
          setVehiculos([]);
        }
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-center">Listado de Vehiculos</h1>

      <VehiculoTable vehiculos={vehiculos} eliminarVehiculo={eliminarVehiculo} setEditar={setEditar} />
    </div>
  );
};

export default Vehiculos;
