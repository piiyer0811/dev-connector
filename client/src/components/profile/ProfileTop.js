import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile }) => {
  return (
    <Fragment>
      <div className='profile-top bg-primary p-2'>
        <img
          src={profile.user.avatar}
          alt='Profile-img'
          className='round-img'
        />
        <div>
          <h1 className='large'>{profile.user.name}</h1>
          <p className='lead'>
            {profile.status} at {profile.company}
          </p>
          <p className='lead'>{profile.location}</p>
        </div>

        <div className='icons my-1'>
          <a href={profile.website ? profile.website : '#'}>
            <i className='fa fa-globe fa-2x'></i>
          </a>
          <a
            href={
              profile.social &&
              profile.social.facebook &&
              profile.social.facebook.length > 0
                ? profile.social.facebook
                : '#'
            }
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
          <a
            href={
              profile.social &&
              profile.social.twitter &&
              profile.social.twitter.length > 0
                ? profile.social.twitter
                : '#'
            }
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
          <a
            href={
              profile.social &&
              profile.social.linkedin &&
              profile.social.linkedin.length > 0
                ? profile.social.linkedin
                : '#'
            }
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
          <a
            href={
              profile.social &&
              profile.social.instagram &&
              profile.social.instagram.length > 0
                ? profile.social.instagram
                : '#'
            }
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
