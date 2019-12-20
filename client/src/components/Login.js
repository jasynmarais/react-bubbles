import React from "react";
import { Formik, Field, Form } from 'formik';
import axiosWithAuth from '../utils/axiosWithAuth';

const loginPath = 'http://localhost:5000/api/login';

const Login = props => {
  const onLogin = ({ username, password }) => {
    axiosWithAuth()
    .post(loginPath, { username, password })
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubbles');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='login-container'>
      <h1 className='title'>Welcome to the Bubble App!</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onLogin}
        render={() => (
          <Form className='login'>
            <Field name='username' type='text' placeholder='Username' />
            <Field name='password' type='text' placeholder='Password' />
            <input className='button submit-button' type='Submit' />
          </Form>
        )}
      />
    </div>
  );
};

export default Login;
