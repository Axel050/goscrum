import { TASKS_FAILURE, TASKS_REQUEST, TASKS_SUCCESS } from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TASKS_SUCCESS:
      return {
        loading: false,
        error: " ",
        tasks: action.payload,
      };
    case TASKS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        tasks: [],
      };
    default:
      return state;
  }
};
