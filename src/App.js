import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register";
import Registered from "./components/Registered";
import Donate from "./components/views/Donate";
// import Error404 from "./components/views/Error404";
import Tasks from "./components/views/Tasks";

const Error404 = lazy(() => import("./components/views/Error404"));

const RequiredAuth = ({ children }) => {
  if (!localStorage.getItem("token"))
    return <Navigate to="/login" replace={true} />;
  return children;
};

const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const App = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Tasks />
                </motion.div>
              </RequiredAuth>
            }
          />

          <Route
            path="login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />

          <Route
            path="/register"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />

          <Route
            path="/donate"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Donate />
              </motion.div>
            }
          />

          <Route
            path="/registered/:teamID"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Registered />
              </motion.div>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<>................................</>}>
                <Error404 />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};
