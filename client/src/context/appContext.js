import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import reducer from '../context/reducer';

import {
  INITIAL_STATE,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  RESEND_LINK_BEGIN,
  RESEND_LINK_SUCCESS,
  RESEND_LINK_ERROR,
  EMAIL_VERIFICATION_BEGIN,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from './action.js';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showNotification: false,
  isAuth: false,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const BackToInitial = async () => {
    dispatch({ type: INITIAL_STATE });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    // localStorage.setItem('organization', organization);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // localStorage.removeItem('organization');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user } });
      // add to local storage
      // addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const resendToken = async (currentUser) => {
    dispatch({ type: RESEND_LINK_BEGIN, payload: { currentUser } });
    try {
      const response = await axios.post('/api/v1/auth/resend', currentUser);
      console.log(response);
      const { user } = response.data;
      dispatch({ type: RESEND_LINK_SUCCESS, payload: { user } });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: RESEND_LINK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const emailVerification = async (verificationToken) => {
    dispatch({ type: EMAIL_VERIFICATION_BEGIN });
    try {
      const response = await axios.get(
        `/api/v1/auth/verify/${verificationToken}`
      );
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      dispatch({ type: EMAIL_VERIFICATION_SUCCESS, payload: { user, token } });
    } catch (error) {
      dispatch({
        type: EMAIL_VERIFICATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error.response.data.msg);
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      // local Storage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        BackToInitial,
        displayAlert,
        registerUser,
        resendToken,
        emailVerification,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
