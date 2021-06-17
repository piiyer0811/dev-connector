import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import { PropTypes } from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  function onClick() {
    deleteAccount();
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          {' '}
          <DashBoardActions />
          {profile.experience.length > 0 && (
            <Experience experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <Education education={profile.education} />
          )}
          <div className='my-2'>
            <button
              onClick={() => {
                onClick();
              }}
              className='btn btn-danger'
            >
              <i className='fas fa-user-minus'></i>
              Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>You haven't set up a profile yet!</h1>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile!
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfile, deleteAccount })(
  Dashboard
);
