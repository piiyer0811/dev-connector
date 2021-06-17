import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//add a like

export const addLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: {
          id,
          likes: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//removeLike
export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: {
          id,
          likes: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//deletePost
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      dispatch(setAlert('Post Deleted!', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//addPost

export const addPost = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(`/api/posts`, formData, config);

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });

      dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//get post by id

export const getPostById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//add a comment

export const addComment = (formData, id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `/api/posts/comment/${id}`,
        formData,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });

      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//delete a comment

export const removeComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
