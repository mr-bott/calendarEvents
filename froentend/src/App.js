
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Calander from './component/Calander';
import ProtectedRoute from './component/ProtectedRoute';
import Logout from './component/Logout';

import "./App.css"

function App() {
  return (
    <Router>
      <h1 className='header'>Calendar </h1>
      <Routes>
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login"  element={ <Login /> } />
        <Route path="/logout"  element={ <Logout /> } />
        <Route path="/"  element={
            <ProtectedRoute>
              <Calander />
            </ProtectedRoute> } />
      </Routes>
    </Router>
  );
}

export default App;
