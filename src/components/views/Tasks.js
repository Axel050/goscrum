import "./Tasks.css";
import Header from "../Header";
import useResize from "../../hooks/useResize";
import Card from "../Card";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
  getTasks,
  deleteTask,
  updateStatus,
} from "../../store/actions/taskActions.js";

const Tasks = () => {
  const token = localStorage.getItem("token");
  const [list, setList] = useState("");
  const [listRender, setListRender] = useState("");
  const [who, setWho] = useState("ME");
  const [importance, setImportance] = useState("ALL");
  const [search, setSearch] = useState("");
  const [listSearch, setlistSearch] = useState([]);
  const isPhone = useResize();
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => {
    return state.taskReducer;
  });

  useEffect(() => {
    dispatch(getTasks(who === "ME" ? "/me" : ""));
  }, [who, dispatch]);

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setListRender(tasks);
    }
    if (importance !== "ALL")
      setListRender(tasks?.filter((el) => el.importance === importance));
    else {
      setListRender(tasks);
    }
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, [tasks, importance]);

  useEffect(() => {
    setlistSearch(listRender);
    if (search) {
      if (
        list.find((el) =>
          el.title.toLowerCase().startsWith(search.toLowerCase())
        )
      ) {
        setListRender(
          listRender.filter((el) =>
            el.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
          )
        );
      } else {
        setListRender(listSearch);
        Swal.fire({
          title: "Sin coincidicencias",
          text: "Por favor introduzca otro titulo",
          confirmButtonText: "Aceptar",
          width: "400px",
          timer: 10000,
          timerProgressBar: true,
        });
      }
    }
  }, [search]);

  const handleSearch = debounce((e) => {
    setSearch(e?.target.value);
  }, 1000);

  const handelDelete = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  };

  const handleStatus = (data) => {
    dispatch(updateStatus(data));
  };
  return (
    <>
      <Header />
      <main>
        <TaskForm />
        <section className="wrapper-list">
          <div className="list-header">
            <h2>Mis Tareas</h2>
          </div>
          <div className="filters">
            <select
              name="importance"
              onChange={(e) => setImportance(e.target.value)}
            >
              <option value="ALL">Seleccionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setWho(e.target.value)}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Mis tareas"
                  value="ME"
                />
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por titulo..."
                onChange={handleSearch}
              />
            </div>
          </div>
          {isPhone ? (
            <div className="list phone">
              <div className="card">
                <div className="close">X</div>
                <h3>Tarea 1</h3>
                <h6>17/17/17 00:22 hs.</h6>
                <h5>Axell paz</h5>
                <button>Nueva</button>
                <button>Alta</button>
                <p>Descripcion de la tarea</p>
              </div>
            </div>
          ) : (
            <div className="list-group">
              {!list?.length ? (
                <div>No hay Tareas creadas</div>
              ) : loading ? (
                <>
                  <SkeletonTheme color="red">
                    <div className="list ">
                      <h2>Nuevas</h2>
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                    </div>
                    <div className="list ">
                      <h2>En Proceso</h2>
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                    </div>
                    <div className="list ">
                      <h2>Finalizadas</h2>
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                      <Skeleton width={250} height={150} />
                    </div>
                  </SkeletonTheme>
                </>
              ) : (
                <>
                  <div className="list ">
                    <h4>Nuevas</h4>
                    {listRender &&
                      listRender
                        .filter((el) => el.status === "NEW")
                        .map((el, i) => (
                          <Card
                            key={i}
                            data={el}
                            deleteCard={handelDelete}
                            editStatus={handleStatus}
                          />
                        ))}
                  </div>

                  <div className="list ">
                    <h4>En Proceso</h4>
                    {listRender &&
                      listRender
                        .filter((el) => el.status === "IN PROGRESS")
                        .map((el, i) => (
                          <Card
                            key={el._id}
                            data={el}
                            deleteCard={handelDelete}
                            editStatus={handleStatus}
                          />
                        ))}
                  </div>

                  <div className="list ">
                    <h4>Finalizadas</h4>
                    {listRender &&
                      listRender
                        .filter((el) => el.status === "FINISHED")
                        .map((el, i) => (
                          <Card
                            key={el._id}
                            data={el}
                            deleteCard={handelDelete}
                            editStatus={handleStatus}
                          />
                        ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;
