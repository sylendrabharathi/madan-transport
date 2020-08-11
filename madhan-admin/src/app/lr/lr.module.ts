import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LrRoutingModule } from './lr-routing.module';
import { IonicModule } from '@ionic/angular';
import { LrDetailComponent } from './lr-detail/lr-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LrListComponent } from './lr-list/lr-list.component';


@NgModule({
  declarations: [
    LrDetailComponent,
    LrListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LrRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LrModule { }
