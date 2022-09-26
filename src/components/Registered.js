import React from "react";
import { useParams } from "react-router-dom";

const Registered = () => {
  const { teamID } = useParams();
  // const teamID = "useParams()";
  return <h1>El TeamID de tu equipo es : {teamID}</h1>;
};

export default Registered;
