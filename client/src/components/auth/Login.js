import React from 'react';
import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const { email, password } = formData;

  async function onSubmit(event) {
    event.preventDefault();
    login({ email, password });
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fa fa-user'></i>Log into your account
      </p>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='email'
            type='email'
            placeholder='Email Address'
            value={formData.email}
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
          />
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Sign In!
          </button>
        </div>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up </Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
