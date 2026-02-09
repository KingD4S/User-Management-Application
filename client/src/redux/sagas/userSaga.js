import { call, put, takeLatest } from "redux-saga/effects";
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
  DELETE_USER_FAILURE

} from "../actions/userAction";

const BASE_URL = "http://localhost:3030/api/users";

function* fetchUsersSaga(action) {
  try {
    const response = yield call(fetch,
      `${BASE_URL}/all-users`,
     {
        method: "GET",
        credentials: "include"
      }
    );
    // console.log(response)
    if (response.status === 403) {
      yield put({ type: "LOGOUT_SUCCESS" });
      window.location.href = "/login";
      return;
    }
    const result = yield response.json();
    
    yield put({
      type: FETCH_USERS_SUCCESS,
      payload: result.users
    });

  } catch (error) {
    yield put({
      type: FETCH_USERS_FAILURE,
      payload: error.message
    });
  }
}

function* createUserSaga(action) {
  try {
    const { userData, onClose } = action.payload;

    const response = yield call(fetch,
      `${BASE_URL}/create-new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData)
      }
    );

    if (response.status === 403) {
      yield put({ type: "LOGOUT_SUCCESS" });
      window.location.href = "/login";
      return;
    }
    
    yield put({ type: CREATE_USER_SUCCESS });
    yield put({ type: FETCH_USERS_REQUEST });
    
    onClose();
    
  } catch (error) {
    yield put({
      type: CREATE_USER_FAILURE,
      payload: error.message
    });
  }
}

function* updateUserSaga(action) {
  
  try {
    const {userData} = action.payload;
    const response = yield call(
      fetch,
      `${BASE_URL}/update/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
      }
    );
    if (response.status === 403) {
      yield put({ type: "LOGOUT_SUCCESS" });
      window.location.href = "/login";
      return;
    }
    
    const result = yield response.json();
    
    if (!response.ok) {
      throw new Error(result.message);
    }
    
    yield put({ type: UPDATE_USER_SUCCESS, payload: {userData} });

    yield put({ type: FETCH_USERS_REQUEST });

  } catch (error) {

    yield put({
      type: UPDATE_USER_FAILURE,
      payload: error.message
    });

  }
}

function* deleteUserSaga(action) {

  try {

    const response = yield call(
      fetch,
      `${BASE_URL}/delete/${action.payload}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );
    if (response.status === 403) {
      yield put({ type: "LOGOUT_SUCCESS" });
      window.location.href = "/login";
      return;
    }

    const result = yield response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    yield put({ type: DELETE_USER_SUCCESS });

    yield put({ type: FETCH_USERS_REQUEST });

  } catch (error) {

    yield put({
      type: DELETE_USER_FAILURE,
      payload: error.message
    });

  }
}


export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);

}
