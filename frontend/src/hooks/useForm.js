import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";

/**
 * @param {*} initialForm = es un objeto
 * @param {*} validateForm = es una funcion
 * @returns
 */
export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState({ error: false, msn: "", enviado: false });
  const [editar, setEditar] = useState(false);

  let navigate = useNavigate();

  // * handleChange = detecte cuando se esta escribiendo y haga cambio de los valores
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // * handleBlur = realiza las validaciones, cuando pierde el foco el elemento de formulario y hace las validaciones
  const handleBlur = (e) => {
    handleChange(e); // crear una copia del formulario, actualizar el formulario y lanzar un mensaje de error
    setErrors(validateForm(errors, e.target.name, form));
  };

  // *handleSubmit = envia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.enviado) return;

    setErrors(validateForm(errors, e.target.name, form));

    if (Object.keys(errors).length === 0) {
      setResponse({ error: false, msn: "", enviado: true });
      if (editar) {
        // Editar
        helpHttp()
          .patchData(`vehiculos`, {
            body: form,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => {
            if (res.error) setResponse({ error: true, msn: res.mensaje, enviado: true });
            else setResponse({ error: false, msn: res.mensaje, enviado: true });
            setForm(initialForm);
            navigate("/");
          });
      } else {
        // Agregar
        helpHttp()
          .postData(`vehiculos`, {
            body: form,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => {
            if (res.error) setResponse({ error: true, msn: res.mensaje, enviado: true });
            else setResponse({ error: false, msn: res.mensaje, enviado: true });
            setForm(initialForm);
          });
      }
      setTimeout(() => {
        setResponse({ error: false, msn: "", enviado: false });
      }, 5000);
    }
  };

  return {
    form,
    errors,
    response,
    editar,
    setForm,
    handleChange,
    handleBlur,
    handleSubmit,
    setEditar,
  };
};
