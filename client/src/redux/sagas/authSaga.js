import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/authAction";

const BASE_URL = "http://localhost:3030/api/auth";

function* loginSaga(action) {
  try {
    const { formData, navigate } = action.payload;

    const response = yield call(fetch,
      `${BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify(formData)
      }
    );

    const result = yield response.json();

     if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    localStorage.setItem("loggedinUser",result.user?.name);

    yield put({ type: LOGIN_SUCCESS, payload: result.user });

    navigate("/home");

  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* signupSaga(action) {
  try {
    const { formData, navigate } = action.payload;

    const response = yield call(fetch,
      `${BASE_URL}/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }
    );
    const result = yield response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }

    console.log(result)
    yield put({ type: SIGNUP_SUCCESS });

    navigate("/login");

  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, payload: error.message });
  }
}

function* logoutSaga(action) {
  try {
    const { navigate } = action.payload;
    const response = yield call(
      fetch,
      `${BASE_URL}/logout`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        credentials: "include"
      }
    );

    const result = yield response.json();
    // console.log(response)
    if (!response.ok) {
      throw new Error(
        result.message || "Logout failed"
      );
    }

    localStorage.removeItem("loggedinUser");

    yield put({
      type: LOGOUT_SUCCESS
    });

    navigate("/login");

  } catch (error) {

    yield put({
      type: LOGOUT_FAILURE,
      payload: error.message
    });

  }
}


export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga)
}
