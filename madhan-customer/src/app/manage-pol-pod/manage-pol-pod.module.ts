import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePolPodRoutingModule } from './manage-pol-pod-routing.module';
import { PolPodListComponent } from './pol-pod-list/pol-pod-list.component';
import { PolPodCreateComponent } from './pol-pod-create/pol-pod-create.component';
import { IonicModule } from '@ionic/angular';
import { PolPodApiService } from './service/api/pol-pod-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PolPodListComponent,
    PolPodCreateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ManagePolPodRoutingModule
  ],
  providers: [
    PolPodApiService
  ]
})
export class ManagePolPodModule { }
