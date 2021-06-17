import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
  const skills = profile.skills.slice(0, 4).map((skill, index) => {
    return (
      <li key={index} className='text-primary'>
        <i className='fa fa-check'></i>
        {skill}
      </li>
    );
  });
  const id = profile.user._id;
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img
          src={profile.user.avatar}
          alt='Profile-img'
          className='round-img'
        />
        <div>
          <h2>{profile.user.name}</h2>
          <p>
            {profile.status} at {profile.company}
          </p>
          <p>{profile.location}</p>
          <Link to={`/profile/${id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>

        <ul>{skills}</ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
