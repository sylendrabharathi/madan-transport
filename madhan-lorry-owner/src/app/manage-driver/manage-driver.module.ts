import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDriverRoutingModule } from './manage-driver-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDriverCreateComponent } from './manage-driver-create/manage-driver-create.component';
import { ManageDriverListComponent } from './manage-driver-list/manage-driver-list.component';


@NgModule({
  declarations: [
    ManageDriverCreateComponent,
    ManageDriverListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ManageDriverRoutingModule
  ]
})
export class ManageDriverModule { }
