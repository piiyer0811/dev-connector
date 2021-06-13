import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            A hub to Create Dev Profiles, share posts and get help from other
            developers.
          </p>

          <div className='button'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
