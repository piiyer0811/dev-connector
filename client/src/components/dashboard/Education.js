import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  function handleClick(id) {
    deleteEducation(id);
  }

  const educations = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.degree}</td>
        <td className='hide-sm'>{edu.fieldofstudy}</td>
        <td className='hide-sm'>
          <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
          {edu.to ? <Moment format='DD/MM/YYYY'>{edu.to}</Moment> : 'current'}
        </td>
        <td>
          <button
            onClick={() => handleClick(edu._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Degree</th>
            <th className='hide-sm'>Field Of Study</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
