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

const reducer = (state, action) => {
  if (action.type === INITIAL_STATE) {
    return {
      isLoading: false,
      showAlert: false,
      alertType: '',
      alertText: '',
      showNotification: false,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      showNotification: true,
      alertType: 'success',
      alertText: `Click the link we sent to  ${action.payload.user.email} to complete your account set-up.`,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  //RESEND EMAIL VERIFICATION LINK
  if (action.type === RESEND_LINK_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === RESEND_LINK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      showNotification: true,
      alertType: 'success',
      alertText: `Updated link sent to ${action.payload.user.email}! click the link to complete your account set-up.`,
    };
  }
  if (action.type === RESEND_LINK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  //EMAIL VERIFICATION
  if (action.type === EMAIL_VERIFICATION_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EMAIL_VERIFICATION_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: false,
      showNotification: false,
      isAuth: true,
      alertType: 'success',
      alertText: `${action.payload.user.email} verified! Redirecting...`,
    };
  }
  if (action.type === EMAIL_VERIFICATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      showNotification: true,
      isAuth: false,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  //LOGIN USER
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      // userLocation: action.payload.locaiton,
      // jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login successful! Redirecting...',
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
