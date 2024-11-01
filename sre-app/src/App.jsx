import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState([]); // State for the fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data); // Set the fetched data
        setLoading(false);      // Disable loading state
      })
      .catch((error) => {
        setError('Error fetching data');
        console.error('Error:', error);
        setLoading(false);      // Disable loading state
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 w-full h-screen flex flex-col items-center justify-center text-white">
      <h1 className="font-bold text-4xl mb-4">Hello EndUser !</h1>
      <p>This page serves as a practice platform for enhancing my Docker and full-stack development skills.</p>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="text-center">
          <h2 className="font-semibold text-2xl mb-2">Data from MySQL Database:</h2>
          <table className="min-w-full bg-slate-500 text-white rounded-2xl">
          <thead>
            <tr>
              {/* Apply rounded corners to the top-left and top-right cells */}
              {Object.keys(data[0] || {}).map((key, index, arr) => (
                <th
                  key={key}
                  className={`py-2 px-4 border-b border-gray-600 bg-gray-600 font-semibold text-left 
                    ${index === 0 ? 'rounded-tl-2xl' : ''} 
                    ${index === arr.length - 1 ? 'rounded-tr-2xl' : ''}`}
                >
                  {key.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-600">
                {Object.values(item).map((value, cellIndex, arr) => (
                  <td
                    key={cellIndex}
                    className={`py-2 px-4 border-b border-gray-600 text-gray-300
                      ${rowIndex === data.length - 1 ? (cellIndex === 0 ? 'rounded-bl-2xl' : '') : ''} 
                      ${rowIndex === data.length - 1 ? (cellIndex === arr.length - 1 ? 'rounded-br-2xl' : '') : ''}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default App;
