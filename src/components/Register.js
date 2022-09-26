import "./Register.css";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormControlLabel, Switch } from "@mui/material";

const initialValues = {
  username: "",
  password: "",
  email: "",
  teamID: "",
  role: "",
  continent: "",
  region: "",
  switch: false,
};

// const { REACT_APP_API_ENDPOINT } = process.env;
// console.log($REACT_APP_PI_ENDPOINT);

// const {REACT_APP_API_ENDPOITN : API_ENDPOINT} = process.env

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://goscrum-api.alkemy.org/auth/data`)
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, []);

  // console.log(data);

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");

    // console.log(values);
  };
  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    // setFieldValue("teamID", teamID);

    // console.log(values.region);

    // const id = Date.now();

    fetch("https://goscrum-api.alkemy.org/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.username,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, { replace: true })
      )
      .catch((err) => console.log(err));
  };
  const required = "*Este campo es requerido";
  const validationSchema = () =>
    Yup.object().shape({
      username: Yup.string()
        .min(4, "El nombre de tener al menos 4 letras")
        .ensure("sens")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Email invalido").required(required),
      // teamID: Yup.string().required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <div>
          <label htmlFor="text">Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "error" : ""}
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              name="switch"
              color="secondary"
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
            />
          }
          label="Perteneces a un equipo ya creado"
        />

        {values.switch && (
          <div>
            <label>Por favor, introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            id="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.role && touched.email ? "error" : ""}
          >
            <option value="">Selecciona un rol ...</option>
            {data?.Rol &&
              data.Rol.map((el, index) => (
                <option value={el} key={index}>
                  {el}
                </option>
              ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            value={values.continent}
            onChange={(e) => handleChangeContinent(e.currentTarget.value)}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Selecciona un continente ...</option>
            {data?.continente?.map((el, index) => (
              <option value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
          {errors.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label htmlFor="region">Region</label>
            <select
              name="region"
              id="region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Selecciona una region ...</option>
              {data?.region?.map((el, index) => (
                <option value={el} key={index}>
                  {el}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}

        <div>
          <button
            type="submit"
            onClick={(e) => console.log("errr", values, errors)}
          >
            Enviar
          </button>
        </div>
        <div>
          <Link to="/login">Inicio de sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
