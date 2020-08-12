import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceRoutingModule } from './reference-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReferenceFormComponent } from './reference-form/reference-form.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReferenceFormComponent,
    ReferenceListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReferenceRoutingModule,
    FormsModule
  ]
})
export class ReferenceModule { }
