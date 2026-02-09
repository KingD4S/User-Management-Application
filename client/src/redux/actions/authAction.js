export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const loginRequest = (formData, navigate) => ({
  type: LOGIN_REQUEST,
  payload: { formData, navigate }
});

export const logoutRequest = (navigate) => ({
  type: LOGOUT_REQUEST,
  payload:{navigate}

});

export const signupRequest = (formData, navigate) => ({
  type: SIGNUP_REQUEST,
  payload: { formData, navigate }
});

