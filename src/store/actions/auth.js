import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expDate', expDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('one');
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      const userId = localStorage.getItem('userId');
      if(expDate <= new Date()) {
        console.log('two');
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout( (expDate.getTime() - new Date().getTime()) / 1000 ) )
      }
    }
  }
}