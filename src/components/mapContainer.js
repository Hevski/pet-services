import React from 'react';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol/index';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';

class MapContainer extends React.Component {
  vectorSource = new VectorSource;
  map;

  componentDidMount() {
    this.initialiseMap()
    this.getMap();
  }
  
  initialiseMap() {
    const eastDunbartonshire = [-4.202298, 55.9743162];
    const eastDunbartonshireWebMercator = fromLonLat(eastDunbartonshire);
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.buildServicesArray(),
        style: new Style({
          image: new CircleStyle({
            radius: 9,
            fill: new Fill({
              color: '#362503'
            })
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

  render() {
    return (
      <div id="mapContainer" ref="mapContainer">{}</div>
    );
  }

}

export default MapContainer;