import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {
  GoogleMap,
  GoogleMapOptions,
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { HomeApiService } from '../service/api/home-api.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import * as Leaflet from 'leaflet';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
declare var google;

@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.scss'],
})
export class TruckDetailComponent implements OnInit {
  @ViewChild('tracking_map', { static: false }) mapElement: ElementRef;

  vehicles: any = [];
  private sub: any;
  bookingId: number;
  location: string;
  polId;

  tracking_map: GoogleMap;
  map: any;
  lMap: Leaflet.Map;
  constructor(private platform: Platform,
    private homeService: HomeApiService,
    private aRoute: ActivatedRoute,
    private loader: LoaderService,
    private geoLocation: Geolocation,
    private alert: AlertServiceService) { }


  async ngOnInit() {
    // await this.platform.ready();
  }
  // ionViewWillEnter() {
  //   this.sub = this.aRoute.params.subscribe(param => {
  //     this.bookingId = Number(param['bookingId']);
  //     this.location = param['source'];
  //     this.polId = Number(param['polId'])
  //   });
  //   this.getNearByTrucks(this.location);

  // }
  ionViewDidEnter() {
    console.log('tracking');

    // this.sub = this.aRoute.params.subscribe(param => {
    //   this.bookingId = Number(param['bookingId']);
    //   this.location = param['source'];
    //   this.polId = Number(param['polId'])
    // });
    // this.getNearByTrucks(this.location);
    this.platform.ready().then(() => this.loadMap());
  }

  // ionViewDidLeave() {
  //   this.sub.unsubscribe();
  // }


  loadMap() {

    console.log(this.mapElement);

    // setInterval(() => {
    // console.log(document.getElementById('tracking_map'));
    // this.geoLocation.getCurrentPosition().then((resp: Geoposition) => {
    //   console.log(resp);

    //   this.map = Leaflet.map('tracking_map').setView([resp.coords.latitude, resp.coords.longitude], 16);
    //   Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(this.map);

    //   const myIcon = Leaflet.icon({
    //     iconUrl: '/assets/images/map_marker_icon.png',
    //     iconSize: [30, 30],
    //   });
    //   var latLon;
    //   var marker = Leaflet.marker([resp.coords.latitude, resp.coords.longitude], { icon: myIcon }).addTo(this.map);
    //   latLon = Leaflet.latLng(resp.coords.latitude, resp.coords.longitude);
    //   var bounds = latLon.toBounds(500); // 500 = metres
    //   this.map.panTo(latLon).fitBounds(bounds);
    //   this.map.setView(latLon, 16);
    //   marker.setLatLng(latLon);
    // }).catch(err => {
    //   console.log(err);

    // })
    // }, 8000);
    const myIcon = Leaflet.icon({
      iconUrl: '/assets/images/map_marker_icon.png',
      iconSize: [30, 30],
    });
    this.map = Leaflet.map("tracking_map").setView([17.3850, 78.4867], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: `Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors, 
        < a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY -
        SA < /a>`})
      .addTo(this.map); // This line is added to add the Tile Layer to our map

    var marker = Leaflet.marker([17.3850, 78.4867], { icon: myIcon }).addTo(this.map);
    var latLon = Leaflet.latLng(17.3850, 78.4867);
    var bounds = latLon.toBounds(500); // 500 = metres
    this.map.panTo(latLon).fitBounds(bounds);
    this.map.setView(latLon, 14);
    marker.setLatLng(latLon);
  }

  // addMarker(lat, lng) {

  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: { lat, lng }
  //   });

  //   let content = "<p>This is your current position !</p>";
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });

  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });

  // }

  getNearByTrucks(source) {
    this.loader.createLoader();
    this.homeService.getFindTruck(source).pipe().subscribe(
      success => {
        this.loader.dismissLoader();
        console.log('sucess', success);
        this.vehicles = success;
      },
      failure => {
        this.loader.dismissLoader();
        console.log('failure ', failure);
      }
    );
  }

  sendMsg(vehicleId) {
    this.alert.alertPromt(`Send Enquiry ? `).then(data => {
      if (Boolean(data)) {
        const req = {
          "RefOrgId": 3,
          "RefPOLBookingMappingId": this.polId,
          "RefVehicleId": vehicleId,
          "RefCreatedBy": 1
        }
        this.homeService.sendMsgToVehicle(req).subscribe(success => {
          console.log('done', success);

        }, failure => {
          console.log('fail', failure);
        });
      }
    });
  }

}
