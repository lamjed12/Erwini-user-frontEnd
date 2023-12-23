import { Component, QueryList, ViewChildren } from '@angular/core';
import { AgmMap, AgmPolygon, ControlPosition, LatLng, LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent   {
@ViewChildren(AgmPolygon) public polygonRefs!: QueryList<AgmPolygon>;



mapRef!: AgmMap;
zoom: number = 15;
lat: number = 36.622761;
lng: number = 10.277137;

activePolygonIndex!: number;
drawingMode: any = null;



polygonOptions = {
  fillOpacity: 0.3,
  fillColor: '#ff0000',
  strokeColor: '#ff0000',
  strokeWeight: 2,
  draggable: true,
  editable: true
}

deleteIconStyle = {
  cursor: 'pointer',
  backgroundImage: 'url(../assets/images/remove.png)',
  height: '24px',
  width: '24px',
  marginTop: '5px',
  backgroundColor: '#fff',
  position: 'absolute',
  top: "2px",
  left: "52%",
  zIndex: 99999
}


polygons: LatLngLiteral[][] = [
  [
    { lat: 36.622761, lng: 10.277137 },
    { lat: 36.632761, lng: 10.375137 },
    { lat: 36.642761, lng: 10.374137 },
     { lat: 36.652761, lng: 10.273137 }
   ],
  [
    { lat: 28.63130796240949, lng: 79.8170110581665 },
    { lat: 28.623623468150655, lng: 79.81705397351074 },
    { lat: 28.623623468150655, lng: 79.82619494183349 },
    { lat: 28.6313832978037, lng: 79.82619494183349 },
    { lat: 28.63130796240949, lng: 79.8170110581665 }
  ]
]
  markers: any;
  clickedPosition: any;

  onLoadMap($event: AgmMap) {
    this.mapRef = $event;
    this.addMarker();
    this.mapRef.mapClick.subscribe((event: any) => {
      if (this.drawingMode === 'marker') {
        this.addMarker();
        this.clickedPosition = event.coords;
      }
    });
  }
  


addMarker() {
  console.log("rrrrrrrrrrrrr");
  if (this.clickedPosition) {
    this.markers.push(this.clickedPosition);
    this.clickedPosition = null; // Reset clicked position
  }
 
}



onClickPolygon(index: number) {
  this.activePolygonIndex = index;
}

onEditPolygon(index: number) {
  const allPolygons = this.polygonRefs.toArray();
  allPolygons[index].getPath()
    .then((path: Array<LatLng>) => {
      this.polygons[index] = path.map((latLng: LatLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng()
      }))
    })
}

onDeleteDrawing() {
  this.polygons = this.polygons.filter((polygon, index) => index !== this.activePolygonIndex)
}
}