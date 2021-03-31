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
      `<div>Wind probability: ${ data.wind_prob }</div>` +
      `<div>When to go: ${ data.when_to_go }</div>`
  }
}