import React, { useState, useEffect } from 'react';
import { createOption } from './option';
import MapToolbar, { ToolbarButton } from './MapToolbar';
import { ICoord } from './option';
import './Map.less';
import 'ol/ol.css';
import OlMap from 'ol/Map';
import View from 'ol/View';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { toLonLat, transform } from 'ol/proj';

interface IMapProps {

}

let map = null;
let draw = null;
let source = null;
let drawFeatures = [];
let vectorLayer = null;

function initializeOpenlayers() {

  var raster = new TileLayer({
    source: new OSM()
  });

  var source = new VectorSource({ wrapX: false });

  var vector = new VectorLayer({
    source: source
  });

  let map = new OlMap({
    layers: [raster, vector],
    target: 'openlayers-map',
    view: new View({
      projection: 'EPSG:4326',
      center: [112, 35],
      zoom: 4
    })
  });

  return [map, vector, source];
}

function addInteraction(callback: (args: ICoord[]) => void) {
  if (!map) {
    return void 0;
  }
  draw && map.removeInteraction(draw);
  draw = new Draw({
    source: source,
    type: 'Polygon'
  });
  map.addInteraction(draw);
  draw.on('drawend', (e) => {
    drawFeatures.push(e.feature);
    const coords = e.feature.getGeometry().getCoordinates();
    callback(drawFeatures.map(feature => feature.getGeometry().getCoordinates()[0]));
  })
}

function removeInteraction() {
  if (!(map && draw)) {
    return void 0;
  }
  map.removeInteraction(draw);
}

function removeFeatures(feature?: any) {
  if (!source) {
    return void 0;
  }
  drawFeatures = [];
  source.clear();
}

export default function Map(props: IMapProps) {
  let [coords, setCoords] = useState<ICoord[]>([]);
  let [currentSelectedButton, setSelectedButton] = useState<ToolbarButton>(ToolbarButton.none);
  function onToolbarButtonSelect(tbIdx: ToolbarButton) {
    if (currentSelectedButton === tbIdx) {
      removeFeatures();
      setSelectedButton(ToolbarButton.none);
      removeInteraction();
      setCoords([])
    } else {
      removeFeatures();
      setSelectedButton(tbIdx);
      removeInteraction();
      if (tbIdx === ToolbarButton.polygon) {
        addInteraction(setCoords);
      }
    }
  }
  useEffect(function () {
    [map, vectorLayer, source] = initializeOpenlayers();
  }, []);
  return <div className="map-box">
    <MapToolbar onSelect={onToolbarButtonSelect} selectedButton={currentSelectedButton} coords={coords} />
    <div id="openlayers-map" className="openlayers-map"></div>
  </div>
}
