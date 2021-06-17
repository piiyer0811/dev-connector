import React, { Fragment } from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  async function onSubmit(event) {
    event.preventDefault();
    const { name, email, password } = formData;
    if (formData.password !== formData.confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      //   const newUser = formData;
      //   try {
      //     const config = {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     };

      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post('/api/users', body, config);

      //     console.log(res.data);
      //   } catch (e) {
      //     console.error(e.response.data);
      //   }
      register({ name, email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fa fa-user'></i>Create Your account!
      </p>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Name'
            value={formData.name}
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='email'
            type='email'
            placeholder='Email Address'
            value={formData.email}
            required
          />
          <small className='form-text'>
            This Website uses gravtar so use an email which has an image
            associated with it.
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            required
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Sign Up!
          </button>
        </div>
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign in </Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

//connect 2 parameter 1)state 2)actions object
export default connect(mapStateToProps, { setAlert, register })(Register);
