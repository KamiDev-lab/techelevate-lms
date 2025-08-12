/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children } ) => {
 const {user, isAuthenticated} = useSelector(store=>store.auth);
 const email = localStorage.getItem("emailForVerification");
   if (!user?.isVerified) {
      return <Navigate to={`/verify-email?email=${email}`} replace />;
   }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AuthenticatedUser = ({ children }) => {
 const {user, isAuthenticated} = useSelector(store=>store.auth);
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};


export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "instructor"){
        return <Navigate to="/"/>
    }

    return children;
}