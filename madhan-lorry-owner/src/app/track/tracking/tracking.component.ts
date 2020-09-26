import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
declare var google;


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
  constructor(private geoLocation: Geolocation, private platform: Platform) { }

  ngOnInit() { }

  ionViewDidEnter() {
    console.log('tracking');
    this.platform.ready().then(() => this.loadMap());

  }

  ngAfterViewInit() {

    // this.loadMap();

  }

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

      Leaflet.marker([resp.coords.latitude, resp.coords.longitude], {icon: myIcon}).addTo(this.map)
      // this.tracking_map = GoogleMaps.create('tracking_map', mapOptions);

      // let marker: Marker = this.tracking_map.addMarkerSync({
      //   title: 'My Location',
      //   icon: 'red',
      //   animation: 'DROP',
      //   position: {
      //     lat: resp.coords.latitude,
      //     lng: resp.coords.longitude
      //   }
      // });
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   alert('clicked');
      // });

      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      // let mapOptions = {
      //   center: latLng,
      //   zoom: 15,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // };

      // this.map = new google.maps.Map(document.getElementById('tracking_map'), mapOptions);


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

}
