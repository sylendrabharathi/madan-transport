import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePolPodRoutingModule } from './manage-pol-pod-routing.module';
import { PolPodListComponent } from './pol-pod-list/pol-pod-list.component';
import { PolPodCreateComponent } from './pol-pod-create/pol-pod-create.component';
import { IonicModule } from '@ionic/angular';
import { PolPodApiService } from './service/api/pol-pod-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


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
    ManagePolPodRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  providers: [
    PolPodApiService,
    NativeGeocoder
  ]
})
export class ManagePolPodModule { }
