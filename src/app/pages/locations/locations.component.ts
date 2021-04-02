import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/interfaces/location';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from 'src/app/services/api-services/main.service';
import { MapComponent } from 'src/app/map/map.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  
  public locations: Location[];

  clickedLocationIndex = -1;
  location: Location;
  loading = false;

  constructor(
    private modalService: NgbModal,
    private mainService: MainService,
    private mapComponent: MapComponent
  ) {}

  ngAfterViewInit() {
  }

  openModal(content, i) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.clickedLocationIndex = i;
    this.location = this.locations[this.clickedLocationIndex];
  }

  async ngOnInit(): Promise<void> {
    //  if (this.loading === true)
    await this.getSpots();
    this.mapComponent.mapFunc(this.locations);
  }

  public async getSpots(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mainService.getSpots().subscribe( 
          (response) => {
              this.locations = response;
              resolve(true);
          }, err => {
              console.error(err);
              reject(false);
          });
    })
  }

  // f() {
  //   console.log(this.locations)
  // }

  // public async getSpots() {
  //   this.mainService.getSpots().subscribe( (response) => {
  //     this.locations = response;
  //     // this.loading = true;
  //   });
  // }

  
}
