import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuthContext } from 'context/AuthContext.jsx';
import './Register.scss';

const Registration = () => {
  // eslint-disable-next-line no-unused-vars
  const { handleRegister } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const handleSubmitRegistration = async (data) => {
    const userImg = new FormData();
    userImg.append('files', data.image[0]);
    await handleRegister(data, userImg);
  };

  return (
    <div className="register">
      <div className="register__content">
        <h2 className="register__title">uTeam - Register</h2>

        <form onSubmit={handleSubmit((data) => handleSubmitRegistration(data))}>
          <div className="register__field">
            <label className="register__label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className={`register__input ${errors.name && 'invalid'}`}
              placeholder="Name"
              {...register('username', { required: 'Name is required' })}
              onKeyUp={() => {
                trigger('name');
              }}
            />
          </div>
          {errors.name && <p className="register__error-message">{errors.name.message}</p>}

          <div className="register__field">
            <label className="register__label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={`register__input ${errors.email && 'invalid'}`}
              placeholder="Email"
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              onKeyUp={() => {
                trigger('email');
              }}
            />
          </div>
          {errors.email && <p className="register__error-message">{errors.email.message}</p>}

          <div className="register__field">
            <label className="register__label" htmlFor="password">
              Password:
            </label>
            <input
              className={`register__input ${errors.password && 'invalid'}`}
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters long',
                },
                maxLength: {
                  value: 15,
                  message: 'Your password must not be longer than 15 characters',
                },
              })}
              onKeyUp={() => {
                trigger('password');
              }}
            />
          </div>
          {errors.password && <p className="register__error-message">{errors.password.message}</p>}

          <div className="register__field">
            <label htmlFor="upload_file">Profile Photo</label>
            <input
              type="file"
              id="upload_file"
              accept=".png, .jpg, .jpeg"
              placeholder="Upload File"
              {...register('image', { required: 'Image is required' })}
            />
            {errors.image && <p className="register__error-message">{errors.image.message}</p>}
          </div>

          <div className="register__btn-container">
            <Link to="/">
              <span className="register__paragraph"> Already have an account? </span>
            </Link>
            <input type="submit" value="submit" className="register__btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
