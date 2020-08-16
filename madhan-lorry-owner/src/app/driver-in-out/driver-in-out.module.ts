import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverInOutRoutingModule } from './driver-in-out-routing.module';
import { DriverInOutComponent } from './driver-in-out/driver-in-out.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverInOutApiService } from './services/api/driver-in-out-api.service';
import { NewDriverInOutComponent } from './new-driver-in-out/new-driver-in-out.component';


@NgModule({
  declarations: [
    DriverInOutComponent,
    NewDriverInOutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DriverInOutRoutingModule,
  ],
  providers: [
    DriverInOutApiService
  ]
})
export class DriverInOutModule { }
