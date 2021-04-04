import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/interfaces/location';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from 'src/app/services/api-services/main.service';
import { MapComponent } from 'src/app/map/map.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit  {

  public locations: Location[] = [];

  clickedLocationIndex = -1;
  location: Location;
  loading = false;
  serverError = false;

  constructor(
    private modalService: NgbModal,
    private mainService: MainService,
    private mapComponent: MapComponent
  ) {}

  openModal(content, i) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.clickedLocationIndex = i;
    this.location = this.locations[this.clickedLocationIndex];
  }

  async ngOnInit(): Promise<void> {
    await this.getSpots();
    this.loading = false;
    this.initializeTable();
    this.mapComponent.mapFunc(this.locations); 
  }

  public async getSpots(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mainService.getSpots().subscribe( 
          (response) => {
              this.locations = response;
              this.loading = true;
              resolve(true);
          }, err => {
              console.error(err);
              this.serverError = true;
              reject(false);
          });
    })
  }

  displayedColumns: string[] = ['name', 'country', 'lat', 'long', 'prob', 'month'];
  dataSource: any;
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
