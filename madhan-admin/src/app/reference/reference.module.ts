import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceRoutingModule } from './reference-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReferenceFormComponent } from './reference-form/reference-form.component';


@NgModule({
  declarations: [
    ReferenceFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReferenceRoutingModule
  ]
})
export class ReferenceModule { }
