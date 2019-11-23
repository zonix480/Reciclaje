import { Component, OnInit, ViewChild } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
 
  @ViewChild("map",null) mapElement;
  map:any;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  ionViewDidLoad(){
   
  }

  initMap(){
    let coords = new google.maps.LatLng(45,100);
    let mapOptions = google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeid: google.maps.MapTypeId.SATELLITE
    }
    this.map  = new google.maps.Map(this.mapElement.nativeElement,mapOptions)

    }

}
