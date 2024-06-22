// videoActions.js

import { DELETE_VIDEO } from '../types';

export const deleteVideo = (videoId) => {
  return {
    type: DELETE_VIDEO,
    payload: videoId
  };
};
