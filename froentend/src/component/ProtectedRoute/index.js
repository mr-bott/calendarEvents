import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const ProtectedRoute = ({ children }) => {
  // Check ifUID exists in the cookies
  const isAuthenticated = Cookies.get('userId') !== undefined;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
