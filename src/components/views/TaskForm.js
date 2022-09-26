import "./TaskForm.css";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const required = "* Campo requerido";
  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(5, "*El titlulo debe tener al menos 5 letras")
        .required(required),
      status: Yup.string().required("*Selecciona perri un stado "),
      importance: Yup.string().required("*Selecciona un prioridad"),
      description: Yup.string()
        .min(10, "La descripcion debe tener al menos 10 caracteres")
        .max(270, "menos de 270")
        .required(required),
    });

  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    fetch("https://goscrum-api.alkemy.org/task/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        task: values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Se crea la tarea");
        resetForm();
      })
      .catch((err) => console.console.warn(err));
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;
  //  TRATAR DE RECARGAR CUANDO SE AGRAGA TAREA
  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              value={values.title}
              type="text"
              name="title"
              placeholder="Titulo"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title && touched.title ? "error" : ""}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : ""}
            >
              <option value="">Seleccionar estado</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En Progeso</option>
              <option value="FINISHED">Terminanda</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              value={values.importance}
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.importance && touched.importance ? "error" : ""}
            >
              <option value="">Seleccionar prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-message">{errors.importance}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            value={values.description}
            name="description"
            cols="30"
            rows="10"
            placeholder="Descripcion"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.description && touched.description ? "error" : ""}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default TaskForm;
