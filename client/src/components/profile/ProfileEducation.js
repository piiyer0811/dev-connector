import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ profile }) => {
  const educations = profile.education.map((education) => {
    return (
      <div key={education._id}>
        <h3>{education.school}</h3>
        <p>
          {' '}
          <Moment format='MMM YYYY'>{education.from}</Moment> -{' '}
          {education.to ? (
            <Moment format='MMM YYYY'>{education.to}</Moment>
          ) : (
            'current'
          )}
        </p>
        <p>
          <strong>Degree:</strong> {education.degree}
        </p>
        <p>
          <strong>Field of Study:</strong> {education.fieldofstudy}
        </p>
        {education.description.length > 0 && (
          <p>
            <strong>Description:</strong> {education.description}
          </p>
        )}
      </div>
    );
  });

  return (
    <Fragment>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {profile.education.length > 0 ? educations : 'No Education Listed..'}
      </div>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
