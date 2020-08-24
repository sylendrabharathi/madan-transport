import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDriverRoutingModule } from './manage-driver-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDriverCreateComponent } from './manage-driver-create/manage-driver-create.component';
import { ManageDriverListComponent } from './manage-driver-list/manage-driver-list.component';
import { ManageDriverApiService } from './services/api/manage-driver-api.service';


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
  ],
  providers: [ManageDriverApiService]
})
export class ManageDriverModule { }
