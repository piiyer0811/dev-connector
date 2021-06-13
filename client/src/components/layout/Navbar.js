import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, logout, loading }) => {
  return (
    !loading &&
    (isAuthenticated ? (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            {' '}
            <i className='fa fa-code'></i> DevConnector{' '}
          </Link>
        </h1>

        <ul>
          <li>
            <Link to='/profiles'>Developers</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          <li>
            <Link to='/dashboard'>
              <i className='fas fa-user'> </i>
              <span className='hide-sm'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                logout();
              }}
              to='/'
            >
              <i className='fas fa-sign-out-alt'> </i>
              <span className='hide-sm'>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    ) : (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            {' '}
            <i className='fa fa-code'></i> DevConnector{' '}
          </Link>
        </h1>

        <ul>
          <li>
            <Link to='/'>Developers</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, { logout })(Navbar);
