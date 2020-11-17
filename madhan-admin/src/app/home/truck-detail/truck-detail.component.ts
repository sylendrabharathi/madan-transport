import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  ILatLng,
  BaseArrayClass
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

  vehicles: any = [];
  private sub: any;
  bookingId: number;
  location: string;
  polId;

  @ViewChild('tracking_map', { static: false }) mapElement: ElementRef;
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
    this.platform.ready().then(() => this.loadMap());
    this.sub = this.aRoute.params.subscribe(param => {
      this.bookingId = Number(param['bookingId']);
      this.location = param['source'];
      this.polId = Number(param['polId'])
    });
    this.getNearByTrucks(this.location);
  }

  // ionViewDidLeave() {
  //   this.sub.unsubscribe();
  // }


  loadMap() {

    console.log(this.mapElement);
    console.log(document.getElementById('tracking_map'));
    this.geoLocation.getCurrentPosition().then((resp: Geoposition) => {
      console.log(resp);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = Leaflet.map('tracking_map').setView([resp.coords.latitude, resp.coords.longitude], 16);
      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const myIcon = Leaflet.icon({
        iconUrl: '/assets/images/map_marker_icon.png',
        iconSize: [38, 38],
      });

      Leaflet.marker([resp.coords.latitude, resp.coords.longitude], { icon: myIcon }).addTo(this.map);

    }).catch(err => {
      console.log(err);

    })

  }

  addMarker(lat, lng) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat, lng }
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

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
