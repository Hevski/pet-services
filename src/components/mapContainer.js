import React from 'react';
import Sidebar from "react-sidebar";
import Modal from 'react-modal';
import ServiceInfo from './serviceInfo';
import ReactDOM from 'react-dom'
// import ServiceForm from './serviceForm';
import { OSM, Vector as VectorSource } from 'ol/source';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol/index';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Icon, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  vectorSource = new VectorSource;
  map;

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
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
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

    var element = document.getElementById('popup');
    var content = document.getElementById('popup-content');

    var popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    this.map.addOverlay(popup);

    this.map.on('click', function (evt) {
      var coordinate = evt.coordinate;
      content.innerHTML = ''

      this.map.forEachFeatureAtPixel(evt.pixel,
        (feature) => {
          let companyName, service, website
          ({ companyName, service, website } = feature.values_)

          content.innerHTML = '<p class="popup">' + companyName + "<br />" + service + "<br />" + website + '</p>';
          popup.setPosition(coordinate);
        });
    }.bind(this));
  }

  getMap() {
    return this.map;
  }

  buildServicesArray() {
    let coordinatesArray = [];
    const servicesArray = this.props.petServiceData
    servicesArray.map(service => {
      const point = new Point(fromLonLat(service.coordinates))
      coordinatesArray.push(new Feature({
        geometry: point,
        companyName: service.companyName,
        service: service.service,
        website: service.website
      }))
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
          <div id="popup" className="ol-popup">
            <a href="#" id="popup-closer" className="ol-popup-closer"></a>
            <div id="popup-content"></div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          style={this.customStyles}>
        </Modal>
      </react-fragment>
    );
  }

}

export default MapContainer;