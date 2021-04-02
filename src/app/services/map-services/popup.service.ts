import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  infoPopup(data: any): string { 
    return `` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Country: ${ data.country }</div>` +
      `<div>Coordinates: ${ data.lat }, ${ data.long }</div>` +
      `<div>Wind probability: ${ data.probability }</div>` +
      `<div>When to go: ${ data.month }</div>`
  }
}