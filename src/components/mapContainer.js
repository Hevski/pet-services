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
  servicesArray = [];


  componentDidMount() {
    this.initialiseMap()
    this.getMap();
  }

  initialiseMap() {
    const place = [-4.226996, 55.899248]
    const lonlat = fromLonLat(place)
    const point = new Point(lonlat)
    const eastDunbartonshire = [-4.202298, 55.9743162];
    const eastDunbartonshireWebMercator = fromLonLat(eastDunbartonshire);
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature(point)
        ],
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

  // buildFeaturesArray() {
  //   let featuresArray = []
  //   const point = new Point([-4.227017, 55.899170]);
  //   featuresArray.push(new Feature(point))

  //   return featuresArray
  // }

  render() {
    return (
      <div id="mapContainer" ref="mapContainer">{}</div>
    );
  }

}

export default MapContainer;