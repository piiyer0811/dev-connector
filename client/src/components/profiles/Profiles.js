import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { PropTypes } from 'prop-types';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = ({ getProfiles, profiles, loading }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and Connect with developers
          </p>

          <div className='profiles'>
            {!loading && profiles.length > 0 ? (
              profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h2>No Profiles Found...</h2>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.profiles,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
