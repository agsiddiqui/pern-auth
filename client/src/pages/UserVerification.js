import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Loading from '../components/Loading.js';

import { useAppContext } from '../context/appContext.js';

const UserVerification = () => {
  // const [values, setValues] = useState(initialState);
  const { isLoading, isAuth, emailVerification } = useAppContext();

  const { verificationToken } = useParams();

  emailVerification(verificationToken);
  useEffect(() => {
    if (!isAuth && isLoading) {
      return <Loading center />;
    }
    if (!isAuth && !isLoading) {
      return <Navigate to='/register' />;
    }
    if (isAuth && !isLoading) {
      return <Navigate to='/' />;
    }
  }, [isAuth, isLoading]);
};

export default UserVerification;
