import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { Location } from 'src/app/interfaces/location';
import { MainService } from 'src/app/services/api-services/main.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson.txt';

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private mainService: MainService
    ) { }

  public locations: any = [];

  locationMarkers(map: L.map, loc): void {
    for (const c of loc) {
      const lon = c.long;
      const lat = c.lat;
      const marker = L.marker([lat, lon]);

      marker.bindPopup(this.popupService.infoPopup(c));
      marker.addTo(map);
    }
  }
}
