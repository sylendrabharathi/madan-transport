import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBookingRoutingModule } from './new-booking-routing.module';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewBookingApiService } from './service/api/new-booking-api.service';
import { PolPodApiService } from '../manage-pol-pod/service/api/pol-pod-api.service';
import { ConsignerApiService } from '../manage-consigner/service/api/consigner-api.service';
import { ApiService } from '../service/api/api.service';
import { LocalstorageService } from '../service/localstorage/localstorage.service';


@NgModule({
  declarations: [BookingCreateComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NewBookingRoutingModule
  ],
  providers: [
    NewBookingApiService,
    PolPodApiService,
    ConsignerApiService
  ]
})
export class NewBookingModule { }
