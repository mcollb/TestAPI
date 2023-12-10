// Home.jsx
import React, { useEffect, useState } from 'react';
const Home = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/fundit/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Si la respuesta es exitosa, tratamos el cuerpo como texto
        const responseData = await response.text();
        setData(responseData);
      } else {
        // Si hay un error, manejamos el error y mostramos el mensaje
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Home</h2>
      {data ? (
        <p>Data from server: {data}</p>
      ) : error ? (
        <p>Error from server: {error}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Home;