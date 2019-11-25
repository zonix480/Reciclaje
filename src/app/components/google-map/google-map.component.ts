import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
 
  @ViewChild("map",null) mapElement;
  map:any;
  public lat;
  public long;
  public directionsService = new google.maps.DirectionsService;
  public directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(private navParams: NavParams, private geolocation: Geolocation,) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
     }).catch((error) => {
        console.log("error de permisos");
     });
    this.initMap();
    console.log(this.navParams);
  }

  ionViewDidLoad(){
   
  }

  public start =  {lat:Number(this.lat), lng:Number(this.long)};
  public end =  {lat:4.59789589984787, lng:-74.2205214713366};
  //public end =  {lat:Number(this.navParams.data.lat), lng:Number(this.navParams.data.lng)};
  initMap(){
    let coords = new google.maps.LatLng(this.navParams.data.lat,this.navParams.data.lng);

    let mapOptions = google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeid: google.maps.MapTypeId.SATELLITE
    }
    this.map  = new google.maps.Map(this.mapElement.nativeElement,mapOptions)
    const marker = new google.maps.Marker({
      position:{
        lat:Number(this.navParams.data.lat),
        lng:Number(this.navParams.data.lng)
      },
      zoom:8,
      map:this.map,
      title:"Ubicación de la persona"
    })

    const mymarker = new google.maps.Marker({
      position:{
        lat:4.6010762561903675,
        lng:-74.19356150239825
      },
      zoom:8,
      map:this.map,
      title:"Ubicación mia"
    })
    this.displayDirection(this.directionsService,this.directionsDisplay)
}
  displayDirection(directionsService, directionsDisplay){
    directionsService.route({
    origin:this.start,
    destination: this.end,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    }
  });

  }
}
