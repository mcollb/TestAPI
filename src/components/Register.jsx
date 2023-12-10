import React, { useState } from 'react';


export default function Register({ userData, setUserData, addUser, setUsers }) {
  const [loading, setLoading] = useState(false);

  const registerDiv = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
  };

  const inputStyle = {
    marginBottom: '10px',
    width: '100%',
  };

  const buttonStyle = {
    marginTop: '10px',
  };

  const registerText = {
    fontSize: '12px',
    color: '#5596CA',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { username, password, email } = userData;
    
    // Validaciones de campos
    if (!username || !password || !email) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle success, e.g., redirect to a success page
        console.log('User registered successfully!');
      } else {
        // Handle errors, e.g., display an error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      console.error('Detalles del error:', error.response); // Esto imprimirá el objeto de respuesta completo
      console.log('Registration failed'); // Este mensaje se mostrará en la consola si la solicitud falla
    }

    setLoading(false);
  };
  

  
 
  

  

  return (
    <div style={registerDiv}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Username:
          <input style={inputStyle} name="username" value={userData.username} onChange={handleInputChange} />
        </label>

        <label>
          Email:
          <input style={inputStyle} name="email" value={userData.email} onChange={handleInputChange} />
        </label>

        <label>
          Password:
          <input
            style={inputStyle}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            type="password"
          />
        </label>

        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'REGISTER'}
        </button>

        <p style={registerText}>Already have an account? Log in</p>
      </form>
    </div>
  );
}
