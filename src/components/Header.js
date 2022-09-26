import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { tasks } = useSelector((state) => {
    return state.taskReducer;
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("login", { replace: true });
  };

  // console.log(process.env);

  return (
    <header>
      <img src="https://placeimg.com/200/100/any" alt="logo" />
      <span>
        {" "}
        {process.env.NODE_ENV} en el puerto {process.env.REACT_APP_PORT}
      </span>
      <div className="wrapper-rigth-header">
        <div>
          <button onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div>Tareas creadas: {tasks.length}</div>
        <p>
          <b>{localStorage.getItem("userName")}</b>
        </p>
        <span onClick={handleLogout}>X</span>
      </div>
    </header>
  );
};

export default Header;
