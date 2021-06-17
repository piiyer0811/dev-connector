import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile }) => {
  const experiences = profile.experience.map((experience) => {
    return (
      <div key={experience._id}>
        <h3>{experience.company}</h3>
        <p>
          {' '}
          <Moment format='MMM YYYY'>{experience.from}</Moment> -{' '}
          {experience.to ? (
            <Moment format='MMM YYYY'>{experience.to}</Moment>
          ) : (
            'current'
          )}
        </p>
        <p>
          <strong>Position:</strong> {experience.title}
        </p>
        {experience.description.length > 0 && (
          <p>
            <strong>Description:</strong> {experience.description}
          </p>
        )}
      </div>
    );
  });

  return (
    <Fragment>
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experiences</h2>
        {profile.experience.length > 0
          ? experiences
          : 'No Experience Listed...'}
      </div>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
