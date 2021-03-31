import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { Location } from 'src/app/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson.txt';

  constructor(
    private http: HttpClient,
    private popupService: PopupService
    ) { }

  public locations: Location[] = [
    { _id: 0, name: "Shanghai", country: "China", latitude: "31", longitude: "121", wind_prob: "41.9%", when_to_go: "April"},
    { _id: 1, name: "Baranquilla", country: "Colombia", latitude: "10", longitude: "-74", wind_prob: "57.0%", when_to_go: "December"},
    { _id: 2, name: "Tunis", country: "Tunisia", latitude: "36", longitude: "10", wind_prob: "33.5%", when_to_go: "June"},
  ]

  locationMarkers(map: L.map): void { 
      // debugger
      for (const c of this.locations) {
        const lon = c.longitude;
        const lat = c.latitude;
        const marker = L.marker([lat, lon]);

        marker.bindPopup(this.popupService.infoPopup(c));
        marker.addTo(map);
      }
  }
}
