import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Home  from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [formUser, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showRegister, setShowRegister] = useState(true);
  const [loginData, setLoginData] = useState({
    token: localStorage.getItem('token') || null,
  });
  

  const handleAddUser = () => {
    addUser(formUser, setUsers, setUserData);
  };

  const handleToggleForm = () => {
    setShowRegister(!showRegister);
  };

  

  const [users, setUsers] = useState();

  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showRegister ? (
              <Register
                setShowRegister={setShowRegister}
                userData={formUser}
                setUserData={setUserData}
                handleAddUser={handleAddUser}
                setUsers={setUsers}
              />
            ) : (
              <Login setLoginData={setLoginData}/>
            )
          }
        />
        <Route path="/home" element={<Home token={loginData.token}/>} />
      </Routes>

      <p>
        {showRegister
          ? "Already have an account? "
          : "Don't have an account? "}
        <span
          onClick={handleToggleForm}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {showRegister ? 'Login here' : 'Register here'}
        </span>
      </p>
    </Router>
  );
}

export default App;