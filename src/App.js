import React from 'react';
import axios from 'axios';
import MapContainer from './components/mapContainer';
import './App.css';

function App() {
  const getRequest = () => {
    axios.get('https://crudpi.io/97bd3e/petservices')
      .then(function (response) {
        console.log(response);
      })
  }
  return (
    <React.Fragment>
      <MapContainer />
      <div>Hello World</div>
        <div>
          <button onClick={getRequest}></button>
        </div>
    </React.Fragment>
  );
}

export default App;
