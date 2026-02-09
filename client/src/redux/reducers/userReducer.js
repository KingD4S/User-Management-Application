import { caES } from "@mui/material/locale";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SET_USER_FILTER
} from "../actions/userAction";

// const initialState = {
//   users: [],
//   loading: false,
//   error: null
// };

const initialState = {
  users: [],
  filteredUsers: [],
  filterText: "",
  loading: false,
  error: null
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case FETCH_USERS_REQUEST:
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, filteredUsers: action.payload };

    case UPDATE_USER_SUCCESS:
    case CREATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };


    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_USER_FILTER:
      const text = action.payload.toLowerCase();
      return {...state,filterText: text,filteredUsers: state.users.filter(user =>
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text)
    )
  };

    
    default:
      return state;
  }
};

export default userReducer;
