import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            // get user details
        } else {
            navigate('/login');
        }
    })
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute