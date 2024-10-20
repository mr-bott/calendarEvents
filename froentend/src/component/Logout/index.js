import React from 'react';
import Cookies from 'js-cookie';
const Logout = () => {


  const handleLogout = () => {
    
    // Clear cookies
    Cookies.remove('userId'); 
    
    // Redirect to the login page 
    window.location.href = '/login';
   
}
handleLogout();
}

export default Logout
