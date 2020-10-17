import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageVehicleRoutingModule } from './manage-vehicle-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageVehicleCreateComponent } from './manage-vehicle-create/manage-vehicle-create.component';
import { ManageVehicleListComponent } from './manage-vehicle-list/manage-vehicle-list.component';
import { ManageVehicleApiService } from './services/api/manage-vehicle-api.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ManageVehicleCreateComponent,
    ManageVehicleListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ManageVehicleRoutingModule,
    TranslateModule
  ],
  providers: [
    ManageVehicleApiService
  ]
})
export class ManageVehicleModule { }
