import { NgModule } from '@angular/core';
import { NewBookingRoutingModule } from './new-booking-routing.module';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewBookingApiService } from './service/api/new-booking-api.service';
import { PolPodApiService } from '../manage-pol-pod/service/api/pol-pod-api.service';
import { ConsignerApiService } from '../manage-consigner/service/api/consigner-api.service';
import { ApiService } from '../service/api/api.service';
import { LocalstorageService } from '../service/localstorage/localstorage.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PolPodComponent } from './pol-pod/pol-pod/pol-pod.component';



@NgModule({
  declarations: [BookingCreateComponent, PolPodComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NewBookingRoutingModule,
    // BrowserModule
  ],
  providers: [
    NewBookingApiService,
    PolPodApiService,
    ConsignerApiService,

  ]
})
export class NewBookingModule { }
