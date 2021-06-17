import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, avatar, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div className='post bg-white my-1 p-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>

        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='DD MMM, YYYY'>{date}</Moment>
          </p>
          <button
            onClick={() => {
              addLike(_id);
            }}
            className='btn'
          >
            <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
          </button>
          <button
            onClick={() => {
              removeLike(_id);
            }}
            className='btn'
          >
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            {' '}
            Discussion <span className='comment-count'>{comments.lengt}</span>
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
