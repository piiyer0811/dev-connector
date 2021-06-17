import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepos from './ProfileGithubRepos';

const Profile = ({ getProfileById, profile: { profile }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/profiles' className='btn'>
        <i className='fas fa-long-arrow-alt-left'> </i>
        Back to Profiles
      </Link>

      <div className='profile-grid my-1'>
        {/* top */}
        <ProfileTop profile={profile} />
        {/* about */}
        <ProfileAbout profile={profile} />
        {/* experience */}
        <ProfileExperience profile={profile} />
        {/* education */}
        <ProfileEducation profile={profile} />

        {/* github */}
        {profile.githubusername && (
          <ProfileGithubRepos username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
