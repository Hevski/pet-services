import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './components/mapContainer';
import './App.css';

function App() {
  const [petServiceData, setPetServiceData] = useState([]);
  const [isLoaded, setLoadingStatus] = useState(false);

  useEffect(() => {
    getPetServiceData()
  }, []);

  const getPetServiceData = () => {
    axios.get('https://crudpi.io/97bd3e/petservices')
      .then(function (response) {
        setPetServiceData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoadingStatus(true)
      })
  }
  return (
    <React.Fragment>
      {isLoaded ? <MapContainer petServiceData={petServiceData} /> : <h1>MAP LOADING PLEASE WAIT</h1>}
    </React.Fragment>
  );
}

export default App;
