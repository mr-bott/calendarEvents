import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'; //  useNavigate for navigating
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase'; // Import configured Firebase auth instance
import './Signup.css'; // Import CSS 

const Signup = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const { email, password } = user;
      await createUserWithEmailAndPassword(auth, email, password);

      // After successful signup, listen for auth state change
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User UID:', user.uid); // Firebase UID
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '', // Handle missing displayName
          };

          // Save user data to the backend
          const url=process.env.REACT_APP_BACKEND_URL
          fetch(`${url}/register-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            .then((data) => console.log('User stored:', data))
            .catch((error) => console.error('Error storing user:', error));
        } else {
          console.log('No user is signed in');
        }
      });

      navigate("/login"); // Navigate to the login page after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='main_signup_container'>
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <input
        type="email"
        name="email"
        className="signup-input"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="signup-input"
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="signup-button" onClick={handleSignup}>Signup</button>

      {error && <p className="error-message">{error}</p>}
      <a> Already have an acount 
      <Link to="/login">Login</Link>
      </a>
    </div>
    </div>
  );
};

export default Signup;
