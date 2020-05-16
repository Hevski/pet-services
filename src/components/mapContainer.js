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
    this.vectorSource = new VectorSource({
      features: []
    });
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#362503',
          width: 2
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

    render() {
        return (
        <div id="mapContainer" ref="mapContainer">{this.map}</div>
        );
    }

}

export default MapContainer;