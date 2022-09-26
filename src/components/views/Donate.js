import React from "react";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <main className="donate">
      {/* <Link to="/" style={{ margin: "20px" }}>
        Home
      </Link> */}
      <section>
        <h1>Colabora con el proyecto</h1>
        <a href="https://mpago.la/2RW1MWq" target="_blank" rel="noreferrer">
          Donar
        </a>
      </section>
    </main>
  );
};

export default Donate;
