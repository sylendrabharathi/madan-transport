import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateCardRoutingModule } from './rate-card-routing.module';
import { IonicModule } from '@ionic/angular';
import { RateCardFormComponent } from './rate-card-form/rate-card-form.component';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';


@NgModule({
  declarations: [
    RateCardFormComponent,
    RateCardListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RateCardRoutingModule
  ]
})
export class RateCardModule { }
