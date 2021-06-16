import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = FormData;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    createProfile(formData, history);
  }

  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form onSubmit={onSubmit} className='form'>
        <div className='form-group'>
          <select onChange={handleChange} name='status' value={status}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Company'
            name='company'
            value={company}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Website'
            name='website'
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Location'
            name='location'
            value={location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            onChange={handleChange}
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => {
              toggleSocialInputs(!displaySocialInputs);
            }}
            type='button'
            className='btn btn-primary'
          >
            Add Social Network Links
          </button>
          <span>(Optional)</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                onChange={handleChange}
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                onChange={handleChange}
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                onChange={handleChange}
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                onChange={handleChange}
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                onChange={handleChange}
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
