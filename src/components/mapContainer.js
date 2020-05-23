import React from 'react';
import Sidebar from "react-sidebar";
import Modal from 'react-modal';
import ServiceInfo from './serviceInfo';
import ServiceForm from './serviceForm';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol/index';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      modalOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  vectorSource = new VectorSource;
  map;
  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  componentDidMount() {
    this.initialiseMap()
    this.getMap();
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  initialiseMap() {
    const eastDunbartonshire = [-4.202298, 55.9743162];
    const eastDunbartonshireWebMercator = fromLonLat(eastDunbartonshire);
    const vectorSource = new VectorSource({
      features: this.buildServicesArray(),
    })
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#362503'
          })
        })
      })
    });

    this.map = new Map({
      layers: [raster, vectorLayer],
      target: this.refs.mapContainer,
      view: new View({
        center: eastDunbartonshireWebMercator,
        zoom: 12,
      })
    });
  }

  getMap() {
    return this.map;
  }

  buildServicesArray() {
    let coordinatesArray = [];
    const servicesArray = this.props.petServiceData
    servicesArray.map(service => {
      const point = new Point(fromLonLat(service.coordinates))
      coordinatesArray.push(new Feature(point))
    })
    return coordinatesArray;
  }

  renderSidebarComponents() {
    const serviceItems = this.props.petServiceData.map((service) =>
      <ServiceInfo 
       key={service.id} 
       companyName={service.companyName} 
       service={service.service} 
       website={service.website} />
    );
    return (
      <React.Fragment>
        <div className="service-info-card">
          <button 
            className="addServiceButton" 
           onClick={() => this.setState({sidebarOpen: false, modalOpen: true})} 
           >Add Service
           </button>
        </div>
        <li className="service-info-container">
          {serviceItems}
        </li>
      </React.Fragment>
    );
  }

  render() {
    return (
      <react-fragment>
        <Sidebar
          sidebar={this.renderSidebarComponents()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button className="sidebarButton" onClick={() => this.onSetSidebarOpen(true)}>
            View List
        </button>
        </Sidebar>
        <div id="mapContainer" ref="mapContainer">
        </div>
        <Modal 
          isOpen={this.state.modalOpen}
          style={this.customStyles}>
          <ServiceForm></ServiceForm>
        </Modal>
      </react-fragment>
    );
  }

}

export default MapContainer;