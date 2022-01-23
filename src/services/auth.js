import axiosInstance from './http';

export const login = async (identifier, password) => {
  const user = { identifier, password };

  try {
    const response = await axiosInstance.post('/api/auth/local/', user);

    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post(`/api/auth/local/register`, {
      username: username,
      email: email,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
