import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { IonicModule } from '@ionic/angular';
import { LocationDetailComponent } from './location-detail/location-detail.component';


@NgModule({
  declarations: [
    LocationDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LocationRoutingModule
  ]
})
export class LocationModule { }
