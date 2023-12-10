import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const loginDiv = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column', // Alinea los elementos en una columna
    justifyContent: 'space-between', // Distribuye el espacio verticalmente
    alignItems: 'center',
    margin: 'auto', // Centra el div horizontalmente
  };

  const inputStyle = {
    marginBottom: '10px', // Agrega un espacio entre los elementos 
    width: '100%', // Ocupa el ancho completo del contenedor
  };

  const buttonStyle = {
    marginTop: '10px', // Agrega un espacio encima del botón
  };

  const registerText = {
    fontSize: '12px',  // Cambia el tamaño del texto
    color: '#5596CA',
  }


  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData ? responseData.token : null;
  
        // Guarda el token en el estado o en el almacenamiento local
        // (usa tu propio estado o almacenamiento según sea necesario)
        setLoginData((prevData) => ({
          ...prevData,
          token: token,
        }));
        localStorage.setItem('token', token);

        navigate('/home'); // Utiliza 'navigate' para redirigir en RR-Dom v6

       
        // Maneja otras acciones de éxito, como redirigir a una nueva página
        console.log('Login successful!');
      } else {
        // Maneja errores, por ejemplo, muestra un mensaje de error
        console.error('Login failed');
        
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      console.error('Detalles del error:', error.response);
      console.log('Login failed');
    }
  };
  
  



  return (
    <div style={loginDiv}>
      <h2>Login</h2>
  
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            style={inputStyle}
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </label>
  
        <label>
          Password:
          <input
            style={inputStyle}
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            type="password"
          />
        </label>
  
        <button style={buttonStyle} type="submit">
          LOGIN
        </button>
      </form>
  
      <p style={registerText}>Don't have an account? Create one</p>
    </div>
  );
  
};

export default Login;
