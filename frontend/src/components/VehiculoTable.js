import React from "react";
import VehiculoTableRow from "./VehiculoTableRow";

const VehiculoTable = ({ vehiculos, eliminarVehiculo, setEditar }) => {
  return (
    <div>
      <table className="table table-dark table-striped table-bordered border-light mt-5">
        <thead>
          <tr className="text-center">
            <th scope="col">Placa</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Capacidad (m^3)</th>
            <th scope="col">Consumo (gal/km)</th>
            <th scope="col">Depreciacion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.length > 0 &&
            vehiculos.map((el) => (
              <VehiculoTableRow key={el.id} vehiculo={el} eliminarVehiculo={eliminarVehiculo} setEditar={setEditar} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiculoTable;
