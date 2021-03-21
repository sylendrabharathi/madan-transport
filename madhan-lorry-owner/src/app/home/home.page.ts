import { Component, NgZone } from '@angular/core';
import { LoaderService } from '../services/Loader/loader.service';
import { HomeApiService } from './service/api/home-api.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transportRate: any = [];
  config: BackgroundGeolocationConfig;
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


  constructor(private homeApi: HomeApiService,
    private loader: LoaderService,
    public zone: NgZone,
    private lsService: LocalStorageService,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation) { }
  ngOnInit() {
    this.trackLocation();
  }
  ionViewWillEnter() {
    this.getHomeData();
  }
  getHomeData() {
    this.loader.createLoader();
    console.log('test');

    this.homeApi.getTransportRate().subscribe(success => {
      console.log('sucess', success);
      this.transportRate = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  trackLocation() {
    this.config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      interval: 1000
      // fastestInterval: 100,
      // stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    console.log('logged');

    this.backgroundGeolocation.configure(this.config)
      .then(() => {
        console.log(',,,', this.config);
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log('my location', location);
          this.zone.run(() => {
            this.lat = location.latitude;
            this.lng = location.longitude;
          });

          this.homeApi.getVehicleId(this.lsService.getMydriverId()).subscribe(success => {
            console.log(success);
            this.lsService.setmyVehicleId(success[0].vehicleId);
            this.updateLorryLocation(this.lsService.getmyVehicleId());
          },
            failure => { })

        }, (err) => { console.log(err); });

      }, (err) => { console.log(err); });
    this.backgroundGeolocation.start();

    this.liveTracking();
  }
  liveTracking() {
    let options: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
    this.watch = this.geolocation.watchPosition(options).pipe().subscribe((position: Geoposition) => {
      console.log(position, this.lsService.getmyVehicleId());
      if (position.coords)
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      if (this.lsService.getmyVehicleId() != null) {
        console.log('updating');
        this.updateLorryLocation(this.lsService.getmyVehicleId());
        console.log('updated');

      }
    });
  }
  public stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
  updateLorryLocation(vehicleId) {
    var req = {
      VehicleId: parseFloat(vehicleId),
      address4: `${this.lat},${this.lng}`
    }
    console.log(req);

    this.homeApi.updateLorryLocation(parseFloat(vehicleId), req).subscribe(sucess => {
      console.log(sucess);
    },
      failure => {
        console.log(failure);
      })
  }
}
