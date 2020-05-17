import React from 'react';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol/index';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';
import Sidebar from "react-sidebar";
import ServiceInfo from './serviceInfo';
import serviceInfo from './serviceInfo';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
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

  renderServiceInfoComponents() {
    const serviceItems = this.props.petServiceData.map((service) =>
      <ServiceInfo key={service.id} companyName={service.companyName} service={service.service} website={service.website} />
    );
    return (
      <li className="service-info-container">
        {serviceItems}
      </li>
    );
  }

  render() {
    return (
      <react-fragment>
        <div id="mapContainer" ref="mapContainer">{}</div>
        <Sidebar
          sidebar={this.renderServiceInfoComponents()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            View List
        </button>
        </Sidebar>
      </react-fragment>
    );
  }

}

export default MapContainer;