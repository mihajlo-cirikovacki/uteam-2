import axiosInstance from './http';

const postNewProfile = async (username, userImgId, userId, companyId) => {
  try {
    const response = await axiosInstance.post('/api/profiles', {
      data: {
        name: username,
        profilePhoto: userImgId,
        user: userId,
        company: companyId,
      },
    });

    console.log(response.data, 'New Profile 🚀🤘');
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export default postNewProfile;
