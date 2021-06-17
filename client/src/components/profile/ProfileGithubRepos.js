import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGitHubRepos } from '../../actions/profile';

const ProfileGithubRepos = ({ username, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(username);
  }, [getGitHubRepos, username]);

  const allrepos = repos.map((repo) => {
    return (
      <div key={repo.id} className='repo bg-white my-1 p-1'>
        <div>
          <h4>
            <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>

        <div>
          <ul>
            <li className='badge badge-primary'>
              Stars :{repo.stargazers_count}
            </li>
            <li className='badge badge-dark'>
              Watchers :{repo.watchers_count}
            </li>
            <li className='badge badge-light'>Forks :{repo.forks_count}</li>
          </ul>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className='profile-github'>
        <h2 className='text-primary'>
          <i className='fab fa-github'></i>
          GitHub Repos
        </h2>

        {allrepos}
      </div>
    </Fragment>
  );
};

ProfileGithubRepos.propTypes = {
  repos: PropTypes.array.isRequired,
  getGitHubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithubRepos);
