import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { alert } from "../../utils/alert";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "*Este campo es requerido";
  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "El nombre de tener al menos 4 letras")
        .required(required),
      password: Yup.string().required(required),
    });

  const onSubmit = () => {
    const { userName, password } = values;
    fetch("https://goscrum-api.alkemy.org/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          alert();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleChange, handleSubmit, values, errors, handleBlur, touched } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register" className="register">
            Registrarme
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
