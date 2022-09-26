import { TASKS_FAILURE, TASKS_REQUEST, TASKS_SUCCESS } from "../types";

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const getTasks = (path) => (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(tasksRequest());
  fetch(`https://goscrum-api.alkemy.org/task${path}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};
//  ARREGLAR PARA QUE DESPUES DE BORRAR SE RESPETEN LOS FILTROS
export const deleteTask = (id) => (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(tasksRequest());
  fetch(`https://goscrum-api.alkemy.org/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};

//  VER QUE NO SE RENDERIZE TODO
export const updateStatus = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  let { title, importance, status, description } = data;
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];
  const indexStatus =
    statusArray.indexOf(status) > 1 ? 0 : statusArray.indexOf(status) + 1;
  status = statusArray[indexStatus];
  fetch(`https://goscrum-api.alkemy.org/task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      task: {
        title,
        importance,
        status,
        description,
      },
    }),
  })
    .then((res) => res.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};
