import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePolPodRoutingModule } from './manage-pol-pod-routing.module';
import { PolPodListComponent } from './pol-pod-list/pol-pod-list.component';
import { PolPodCreateComponent } from './pol-pod-create/pol-pod-create.component';


@NgModule({
  declarations: [
    PolPodListComponent,
    PolPodCreateComponent
  ],
  imports: [
    CommonModule,
    ManagePolPodRoutingModule
  ]
})
export class ManagePolPodModule { }
