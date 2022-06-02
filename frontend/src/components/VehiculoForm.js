import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import { useForm } from "../hooks/useForm";
import "./VehiculoForm.css";

const initialForm = {
  placa: "",
  modelo: "",
  capacidad: "",
  consumo: "",
  depreciacion: "",
  id_marca: "",
};

/********************************************************************************************************* */
// VALIDACIONES
const validationsForm = (errorsHook, nameField, form) => {
  // ? Si el objeto errors sigue vacio entonces no existen errores y si contiene errores es porque si hubo errores.
  let errors = errorsHook;

  if (nameField === "placa") {
    if (!form.placa.trim()) {
      errors.placa = `El número de placa es requerido`;
    } else {
      delete errors.placa;
    }
  }

  if (nameField === "modelo") {
    if (!form.modelo.trim()) {
      errors.modelo = `El Modelo es Requerido`;
    } else {
      delete errors.modelo;
    }
  }

  if (nameField === "capacidad") {
    if (!form.capacidad.trim()) {
      errors.capacidad = `La capacidad es requerido`;
    } else if (isNaN(form.capacidad.trim())) {
      errors.capacidad = `La capacidad debe ser numerica`;
    } else if (Number(form.capacidad.trim()) < 0) {
      errors.capacidad = `La capacidad debe ser mayor a 0`;
    } else {
      delete errors.capacidad;
    }
  }

  if (nameField === "consumo") {
    if (!form.consumo.trim()) {
      errors.consumo = `El consumo de combustible es requerido`;
    } else if (isNaN(form.consumo.trim())) {
      errors.consumo = `La consumo debe ser numerica`;
    } else if (Number(form.consumo.trim()) < 0) {
      errors.consumo = `La consumo debe ser mayor a 0`;
    } else {
      delete errors.consumo;
    }
  }
  if (nameField === "depreciacion") {
    if (!form.depreciacion.trim()) {
      errors.depreciacion = `La depreciacion de combustible es requerido`;
    } else if (isNaN(form.depreciacion.trim())) {
      errors.depreciacion = `La depreciacion debe ser numerica`;
    } else if (Number(form.depreciacion.trim()) < 0) {
      errors.depreciacion = `La depreciacion debe ser mayor a 0`;
    } else {
      delete errors.depreciacion;
    }
  }
  if (nameField === "id_marca") {
    if (!form.id_marca.trim()) {
      errors.id_marca = `Debe escoger la marca`;
    } else {
      delete errors.id_marca;
    }
  }

  return errors;
};

/********************************************************************************************************* */
let stylesP = {
  backgroundColor: "#dc3545",
  color: "white",
  fontSize: "0.8rem",
  fontWeight: "bold",
  padding: "0.2rem",
};

let stylesE = {
  backgroundColor: "#dc3545",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: "1rem",
  textAlign: "center",
};

let stylesS = {
  backgroundColor: "#008f39",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: "1rem",
  textAlign: "center",
};

/********************************************************************************************************* */

const VehiculoForm = () => {
  // Hook personalizado con 4 variables de estado
  const { form, editar, errors, response, setForm, setEditar, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );
  const [marcas, setMarcas] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    //   cargar las marcas
    helpHttp()
      .getData("marcas")
      .then((res) => {
        if (!res.err && !res.error) {
          setMarcas(res.data);
        } else {
          setMarcas([]);
        }
      });

    if (id !== undefined) {
      helpHttp()
        .getData(`vehiculos/${id}`)
        .then((res) => {
          if (!res.err && !res.error) {
            setForm(res.data);
            setEditar(true);
          }
        });
    }
  }, [id, setForm, setEditar]);

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {editar ? (
            <input
              type="text"
              className="form-control"
              name="placa"
              placeholder="Ingrese la placa"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.placa}
              disabled
            />
          ) : (
            <input
              type="text"
              className="form-control"
              name="placa"
              placeholder="Ingrese la placa"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.placa}
              required
            />
          )}

          {errors.placa && <p style={stylesP}>{errors.placa}</p>}

          <select
            className="form-select mt-4"
            aria-label="Default select example"
            name="id_marca"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Seleccionar Marca</option>
            {marcas.length > 0 &&
              marcas.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nombre}
                </option>
              ))}
          </select>
          {errors.id_marca && <p style={stylesP}>{errors.id_marca}</p>}

          <input
            type="text"
            className="form-control"
            name="modelo"
            placeholder="Ingrese el modelo del vehiculo"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.modelo}
            required
          />
          {errors.modelo && <p style={stylesP}>{errors.modelo}</p>}

          <input
            type="number"
            className="form-control"
            name="capacidad"
            placeholder="Ingrese la capacidad en metros cubicos (m^3)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.capacidad}
            required
          />
          {errors.capacidad && <p style={stylesP}>{errors.capacidad}</p>}

          <input
            type="number"
            className="form-control"
            name="consumo"
            placeholder="Ingrese el consumo de combustible por kilometro (km)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.consumo}
            required
          />
          {errors.consumo && <p style={stylesP}>{errors.consumo}</p>}

          <input
            type="number"
            className="form-control"
            name="depreciacion"
            placeholder="Ingrese el costo en Quetzales de depreciacion por kilometro recorrido "
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.depreciacion}
            required
          />
          {errors.depreciacion && <p style={stylesP}>{errors.depreciacion}</p>}
        </div>

        {!response.error && response.msn && response.enviado && <p style={stylesS}>{response.msn}</p>}
        {response.error && <p style={stylesE}>{response.msn}</p>}

        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            {editar ? "Editar" : "Agregar"}
          </button>

          <button type="reset" className="btn btn-secondary">
            Borrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehiculoForm;
