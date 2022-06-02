import React from "react";

const VehiculoTableRow = ({ vehiculo, eliminarVehiculo, setEditar }) => {
  const { id, placa, marca, modelo, capacidad, consumo, depreciacion } = vehiculo;
  return (
    <tr className="text-center">
      <th scope="row">{placa}</th>
      <td>{marca}</td>
      <td>{modelo}</td>
      <td>{capacidad}</td>
      <td>{consumo}</td>
      <td>Q{depreciacion}</td>
      <td>
        <button type="button" className="btn btn-primary me-2" onClick={() => setEditar(id)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={() => eliminarVehiculo(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default VehiculoTableRow;
