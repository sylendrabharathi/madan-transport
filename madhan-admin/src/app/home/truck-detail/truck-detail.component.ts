import { Component, OnInit } from '@angular/core';

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
  map: GoogleMap;
  constructor(private platform: Platform, private homeService: HomeApiService, private aRoute: ActivatedRoute) { }

  async ngOnInit() {
    // this.getVehicles();
    this.sub = this.aRoute.params.subscribe(param => {
      this.bookingId = Number(param['bookingId']);
      this.location = param['source'];
    });
    this.getNearByTrucks(this.location);
    await this.platform.ready();
    await this.loadMap();

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getVehicles(data) {
    for (let i = 0; i < 15; i++) {
      const vehicle = {
        ownerName: 'Das',
        vehicleNo: 'TN 46 B 8885',
        liveLocationTxt: '6th main road, sadasivam nagar, chennai',
        mobileNo: '9632587410',
        vehicleType: 'Truck'
      };
      this.vehicles.push(vehicle);
    }
  }

  loadMap() {

    // This code is necessary for browser
    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCqVtI71OxAt2FxYYn0XT5nx64ixOqH6Y4',
    //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCqVtI71OxAt2FxYYn0XT5nx64ixOqH6Y4'
    // });

    let POINTS = [
      {
        position: { lat: 41.79883, lng: 140.75675 },
        iconData: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Ftransport-icons-by-icons-land%2Ftruck-icon.html&psig=AOvVaw0gXdcQFmIPYVLiN0_Ca7ks&ust=1589288135193000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjQzaXuq-kCFQAAAAAdAAAAABAM"
      },
      {
        position: { lat: 41.799240000000005, lng: 140.75875000000002 },
        iconData: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Ftransport-icons-by-icons-land%2Ftruck-icon.html&psig=AOvVaw0gXdcQFmIPYVLiN0_Ca7ks&ust=1589288135193000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjQzaXuq-kCFQAAAAAdAAAAABAM"
      },
      {
        position: { lat: 41.797650000000004, lng: 140.75905 },
        iconData: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Ftransport-icons-by-icons-land%2Ftruck-icon.html&psig=AOvVaw0gXdcQFmIPYVLiN0_Ca7ks&ust=1589288135193000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjQzaXuq-kCFQAAAAAdAAAAABAM"
      },
      {
        position: { lat: 41.79637, lng: 140.76018000000002 },
        title: "4",
        iconData: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Ftransport-icons-by-icons-land%2Ftruck-icon.html&psig=AOvVaw0gXdcQFmIPYVLiN0_Ca7ks&ust=1589288135193000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjQzaXuq-kCFQAAAAAdAAAAABAM"
      },
      {
        position: { lat: 41.79567, lng: 140.75845 },
        title: "5",
        iconData: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Ftransport-icons-by-icons-land%2Ftruck-icon.html&psig=AOvVaw0gXdcQFmIPYVLiN0_Ca7ks&ust=1589288135193000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjQzaXuq-kCFQAAAAAdAAAAABAM"
      }
    ];

    let bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      console.log(data);
      return data.position;
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: bounds,
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    console.log(this.map);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

      console.log('map loaded');

      // let marker: Marker = this.map.addMarkerSync({
      //   title: 'Ionic',
      //   icon: 'red',
      //   animation: 'DROP',
      //   position: {
      //     lat: 43.0741904,
      //     lng: -89.3809802
      //   }
      // });
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      // });


    }).catch(err => {
      console.log(err);

    });

  }

  getNearByTrucks(source) {
    console.log('->', this.bookingId, this.location);

    this.homeService.getFindTruck(source).pipe().subscribe(
      success => {
        console.log('sucess', success);
        // this.getVehicles(success);
        this.vehicles = success;
      },
      failure => { console.log('failure ', failure); }
    );
  }

}
