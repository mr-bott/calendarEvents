
import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Firebase auth instance
import { useNavigate } from 'react-router-dom'; // For navigation
import Cookies from 'js-cookie'; // Import js-cookie
import './login.css'; // Import CSS 

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError(" ");
  };

  const handleLogin = async () => {
    try {
      const { email, password } = user;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user; // Extract Firebase UID
      
      Cookies.set('userId', uid, { expires: 20, secure: true });
      //Storing uid as userId for next api calls 

      navigate('/'); // Navigate to the calendar page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
<div className='main_container'>
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        type="email"
        name="email"
        className="login-input"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="login-input"
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      <a> Dont have acoount Register
      <Link to="/signup">Signup</Link>
      </a>
      
    </div>
    </div>
  );
};

export default Login;

