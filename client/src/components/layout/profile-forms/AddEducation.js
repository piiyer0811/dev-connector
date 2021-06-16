import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../../actions/profile';
import { PropTypes } from 'prop-types';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const [toDateDisabled, toggleToDate] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleClick(e) {
    const { name, checked } = e.target;
    if (checked) {
      toggleToDate(true);
    } else {
      toggleToDate(false);
    }

    setFormData((prev) => {
      return {
        ...prev,
        [name]: checked,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    addEducation(formData, history);
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input onChange={handleChange} type='date' name='from' value={from} />
        </div>
        <div className='form-group'>
          <p>
            <input
              onClick={handleClick}
              type='checkbox'
              name='current'
              value={current}
            />{' '}
            Current School
          </p>
        </div>
        {!toDateDisabled && (
          <Fragment>
            <div className='form-group'>
              <h4>To Date</h4>
              <input onChange={handleChange} type='date' name='to' value={to} />
            </div>
          </Fragment>
        )}

        <div className='form-group'>
          <textarea
            onChange={handleChange}
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
