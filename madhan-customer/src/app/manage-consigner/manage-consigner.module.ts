import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageConsignerRoutingModule } from './manage-consigner-routing.module';
import { ConsignerListComponent } from './consigner-list/consigner-list.component';
import { ConsignerCreateComponent } from './consigner-create/consigner-create.component';
import { ConsignerApiService } from './service/api/consigner-api.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


@NgModule({
  declarations: [
    ConsignerListComponent,
    ConsignerCreateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ManageConsignerRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  providers: [
    ConsignerApiService,
    NativeGeocoder
  ]
})
export class ManageConsignerModule { }
