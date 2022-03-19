import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext.js';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const {
    user,
    token,
    isLoading,
    showAlert,
    displayAlert,
    showNotification,
    BackToInitial,
    registerUser,
    resendToken,
    loginUser,
  } = useAppContext();

  // const { token } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (user && token) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, token, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password, isMember };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    // console.log(values);
  };

  const backToRegister = () => {
    BackToInitial();
  };
  const resendLink = () => {
    const { email, isMember } = values;
    const currentUser = { email, isMember };
    resendToken(currentUser);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>
          {showNotification
            ? 'Check your Email'
            : values.isMember
            ? 'Login'
            : 'Register'}
        </h3>
        {showAlert && <Alert />}
        {/* toggle name */}
        {!showNotification && !values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {!showNotification && (
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
        )}
        {!showNotification && (
          <button
            type='submit'
            className='btn btn-block'
            onSubmit={onSubmit}
            disabled={isLoading}
          >
            submit
          </button>
        )}
        {showNotification && (
          <p>
            <button type='button' onClick={resendLink} className='member-btn'>
              Resend link
            </button>
          </p>
        )}
        {!showNotification ? (
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' onClick={toggleMember} className='member-btn'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        ) : (
          <p>
            <button
              type='button'
              onClick={backToRegister}
              className='member-btn'
            >
              Back to Register
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
