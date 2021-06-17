import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  const skills = profile.skills.map((skill, index) => {
    return (
      <div key={index} className='p-1'>
        <i className='fa fa-check'></i>
        {skill}
      </div>
    );
  });

  return (
    <Fragment>
      <div className='profile-about bg-white p-2'>
        <h2 className='text-primary'>{`${profile.user.name}'s bio..`}</h2>
        <p className='lead'>{profile.bio}</p>
        <div className='line'></div>
        <h2 className='text-primary'>Skill Set</h2>
        <div className='skills'>{skills}</div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
