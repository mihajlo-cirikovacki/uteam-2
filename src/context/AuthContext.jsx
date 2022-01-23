import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { login, register } from 'services/auth.js';
import { getUserStats, getProfileImage } from 'services/getUser.js';
import postCompany from 'services/postCompany.js';
import postNewProfile from 'services/postNewProfile.js';
import uploadUserImage from 'services/uploadUserImage.js';

const AuthContext = createContext({
  currentUser: {},
  isUserLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginUser = useCallback(
    async (userData) => {
      localStorage.setItem('userJwt', userData.jwt);
      setUserLoggedIn(true);
      navigate('/pending-approval');
      const user = await getUserStats();
      const userImage = await getProfileImage(user.id);
      user['imagePathURL'] = userImage[0];
      user['imageName'] = userImage[1];
      setCurrentUser(user);

      console.log({ userData }, { jwt: userData.jwt }, { user }, { userImage });
    },
    [navigate]
  );

  const handleRegister = async (data, userImg) => {
    try {
      const [userData, companyResponse, uploadResponse] = await Promise.all([
        register(data.username, data.email, data.password),
        postCompany(data.username),
        uploadUserImage(userImg),
      ]);

      await postNewProfile(
        data.username,
        uploadResponse[0].id,
        userData.user.id,
        companyResponse.id
      );
      loginUser(userData);
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
    }
  };

  const handleLogin = async (identifier, password) => {
    try {
      const userData = await login(identifier, password);
      loginUser(userData);
    } catch (err) {
      console.error(`${err.message}, 💥🤯`);
    }
  };

  const handleLogout = () => {
    console.log('User LOGGED OUT!!');
    setCurrentUser(null);
    setUserLoggedIn(false);
    localStorage.clear();
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userJwt');
    if (loggedInUser) {
      const foundUser = loggedInUser;
      // setUserLoggedIn(true);
      console.log('FOUND USER jwt!!!', { jwt: foundUser });
      loginUser({ jwt: foundUser });
    }
  }, [loginUser]);

  const authContext = {
    currentUser,
    isUserLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
