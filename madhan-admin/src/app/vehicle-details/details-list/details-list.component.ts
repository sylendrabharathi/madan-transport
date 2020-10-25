import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { VehicleDetailsapiService } from '../service/api/vehicle-detailsapi.service';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
})
export class DetailsListComponent implements OnInit {

  vehiclesList: any = [];
  referenceListId: number;
  bookingMappingJson = {
    'RefOrgId': 3,
    'RefPOLBookingMappingId': 0,
    'RefVehicleId': 0,
    'RefVehicleBookingEnqResponseId': 0,
    'RefCreatedBy': null,
    'RefModifiedby': null,
    'refRateID': 0
  };
  constructor(private vehicleDetailsApi: VehicleDetailsapiService,
    private loader: LoaderService,
    private alert: AlertServiceService,
    private toast: ToastService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getWillingTruck();
  }

  getWillingTruck() {
    this.loader.createLoader();
    this.vehicleDetailsApi.getWillingVehicles().pipe().subscribe(success => {
      console.log('success', success);
      this.vehiclesList = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  getTranspoterRate() {
    this.vehicleDetailsApi.getTrasnpoterRate().subscribe(success => {
      console.log('transpoterSuccess', success);
      this.referenceListId = success[0].referenceListId;
    }, failure => { });
  }
  confirm(polId, refVehicle, enqResId) {
    var sourceIdByRate, destiantionIdByRate;
    this.alert.alertPromt(`Send confirmation ? `).then(data => {
      if (Boolean(data)) {
        this.getTranspoterRate();
        this.vehicleDetailsApi.getPolById(polId).subscribe((success: any) => {
          this.loader.createLoader();
          console.log('success', success);
          this.vehicleDetailsApi.getRateById(success.refRateId).subscribe(success => {
            console.log('rateSuccess', success[0]);
            sourceIdByRate = success[0].refSourceReferenceList;
            destiantionIdByRate = success[0].refDestinationReferenceList;
            this.vehicleDetailsApi.getSpecificRate(this.referenceListId, sourceIdByRate, destiantionIdByRate).subscribe(success => {
              this.loader.dismissLoader();
              console.log('specificsuceess', success);
              this.bookingMappingJson.refRateID = success[0].rateId;
              this.bookingMappingJson.RefPOLBookingMappingId = polId;
              this.bookingMappingJson.RefVehicleId = refVehicle;
              this.bookingMappingJson.RefVehicleBookingEnqResponseId = enqResId;
              this.vehicleDetailsApi.addVehicleBookingMapping(this.bookingMappingJson).subscribe(success => {
                console.log('added', success);
                this.ionViewWillEnter();
              }, failure => { this.loader.dismissLoader(); this.toast.danger('not added' + failure); })

            },
              failure => { this.loader.dismissLoader(); this.toast.danger(failure); })
          }, failure => { this.loader.dismissLoader(); this.toast.danger(failure); });
        }, failure => { this.loader.dismissLoader(); this.toast.danger(failure); });


      }
    });
  }
}
