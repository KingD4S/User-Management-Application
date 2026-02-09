export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const SET_USER_FILTER = "SET_USER_FILTER";

export const fetchUsersRequest = (tags = []) => ({
  type: FETCH_USERS_REQUEST,
  payload: tags
});

export const createUserRequest = (userData, onClose) => ({
  type: CREATE_USER_REQUEST,
  payload: { userData, onClose }
});

export const updateUserRequest = (userData) => ({
  type: UPDATE_USER_REQUEST,
  payload: {userData}
});

export const deleteUserRequest = (id) => ({
  type: DELETE_USER_REQUEST,
  payload: id
});

export const setUserFilter = (filterText) => ({
  type: SET_USER_FILTER,
  payload: filterText
});