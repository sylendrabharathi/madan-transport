import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailsRoutingModule } from './vehicle-details-routing.module';
import { DetailsListComponent } from './details-list/details-list.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    DetailsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    VehicleDetailsRoutingModule
  ]
})
export class VehicleDetailsModule { }
