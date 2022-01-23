import _ from 'lodash';

import axiosInstance from './http';

import { PROFILEIMAGEURLPATH, PROFILEIMAGENAME } from 'config/config.js';

export const getUserStats = async () => {
  try {
    const response = await axiosInstance.get('/api/users/me');
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getProfileImage = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/profiles?filters[user][id][$eq]=${userId}&populate=profilePhoto`
    );
    console.log('profile data', response.data, PROFILEIMAGEURLPATH);
    return [_.get(response.data, PROFILEIMAGEURLPATH), _.get(response.data, PROFILEIMAGENAME)];
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
