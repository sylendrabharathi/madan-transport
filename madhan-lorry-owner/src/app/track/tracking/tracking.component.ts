import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { TrackApiService } from '../services/api/track-api.service';



@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  @ViewChild('tracking_map', { static: false }) mapElement: ElementRef;
  tracking_map: GoogleMap;
  map: any;
  lMap: Leaflet.Map;
  vehicleId: number;
  lat: number;
  long: number;

  constructor(private geoLocation: Geolocation,
    private platform: Platform,
    private activeRoute: ActivatedRoute,
    private trackApi: TrackApiService,
    private loader: LoaderService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    console.log('tracking');
    this.activeRoute.params.subscribe(data => {
      console.log(data);
      // this.loader.createLoader();
      this.vehicleId = data.vehicleId;
      this.trackApi.getVehicleLiveLoc(this.vehicleId).subscribe(success => {
        var latLong;
        if (success[0].vehiLocationAddress4.includes(','))
          latLong = success[0].vehiLocationAddress4.split(',');
        else if (success[0].vehiLocationAddress4.includes(' '))
          latLong = success[0].vehiLocationAddress4.split(' ');
        if (latLong.length > 1) {
          this.lat = latLong[0];
          this.long = latLong[1];
          this.platform.ready().then(() => this.loadMap());
        }

      }, failure => { });
      // this.loader.dismissLoader();
    });

  }

  ngAfterViewInit() {
  }

  loadMap() {
    this.geoLocation.getCurrentPosition().then((resp: Geoposition) => {
      this.map = Leaflet.map('tracking_map').setView([this.lat, this.long], 16);
      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const myIcon = Leaflet.icon({
        iconUrl: '/assets/images/map_marker_icon.png',
        iconSize: [30, 30],
      });
      var latLon;
      var marker = Leaflet.marker([this.lat, this.long], { icon: myIcon }).addTo(this.map)
      setInterval(() => {
        this.trackApi.getVehicleLiveLoc(this.vehicleId).subscribe(success => {
          var latLong;
          if (success[0].vehiLocationAddress4.includes(','))
            latLong = success[0].vehiLocationAddress4.split(',');
          else if (success[0].vehiLocationAddress4.includes(' '))
            latLong = success[0].vehiLocationAddress4.split(' ');
          if (latLong.length > 1) {

            latLon = Leaflet.latLng(latLong[0], latLong[1]);
          }

        }, failure => { });

        var bounds = latLon.toBounds(500); // 500 = metres
        this.map.panTo(latLon).fitBounds(bounds);
        this.map.setView(latLon, 16);
        marker.setLatLng(latLon);
      }, 8000);
    }).catch(err => {
      console.log(err);

    })

  }


}
