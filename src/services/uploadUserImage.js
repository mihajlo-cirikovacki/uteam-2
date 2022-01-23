import axiosInstance from './http';

const uploadUserImage = async (userImg) => {
  try {
    const response = await axiosInstance.post('/api/upload', userImg);

    console.log(response.data, 'User img 🚀🤘');
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export default uploadUserImage;
