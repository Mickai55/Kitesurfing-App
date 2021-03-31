import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/interfaces/location';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  
  public locations: Location[] = [
    { _id: 0, name: "Shanghai", country: "China", latitude: "31", longitude: "121", wind_prob: "41.9%", when_to_go: "April"},
    { _id: 1, name: "Baranquilla", country: "Colombia", latitude: "10", longitude: "-74", wind_prob: "57.0%", when_to_go: "December"},
    { _id: 2, name: "Tunis", country: "Tunisia", latitude: "36", longitude: "10", wind_prob: "33.5%", when_to_go: "June"},
  ]

  closeResult = '';
  clickedLocationIndex = -1;
  location: Location;
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  openModal(content, i) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.clickedLocationIndex = i;
    this.location = this.locations[this.clickedLocationIndex];
  }
}
