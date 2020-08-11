import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReportsDetailComponent } from './reports-detail/reports-detail.component';


@NgModule({
  declarations: [
    ReportsDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
