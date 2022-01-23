import axiosInstance from './http';

const postCompany = async (username) => {
  try {
    const response = await axiosInstance.post('/api/companies', {
      data: {
        name: `${username}'s Company`,
      },
    });

    console.log(response.data, 'Company 🚀🤘');
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export default postCompany;
