import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './components/mapContainer';
import './App.css';

function App() {
  const [petServiceData, setPetServiceData] = useState([]);

  useEffect(() => {
    getPetServiceData()
  });

  const getPetServiceData = () => {
    axios.get('https://crudpi.io/97bd3e/petservices')
      .then(function (response) {
        setPetServiceData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return (
    <React.Fragment>
      <MapContainer petServiceData={petServiceData} />
    </React.Fragment>
  );
}

export default App;
