// videoReducer.js

import { DELETE_VIDEO } from '../types';

const initialState = {
  videos: [] // Assuming you have a state for storing videos
};

const videoReducer = (state = initialState, action) => {
  switch(action.type) {
    case DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload)
      };
    default:
      return state;
  }
};

export default videoReducer;
