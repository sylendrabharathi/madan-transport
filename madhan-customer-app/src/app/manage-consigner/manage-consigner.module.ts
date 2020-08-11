import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageConsignerRoutingModule } from './manage-consigner-routing.module';
import { ConsignerListComponent } from './consigner-list/consigner-list.component';
import { ConsignerCreateComponent } from './consigner-create/consigner-create.component';


@NgModule({
  declarations: [
    ConsignerListComponent,
    ConsignerCreateComponent
  ],
  imports: [
    CommonModule,
    ManageConsignerRoutingModule
  ]
})
export class ManageConsignerModule { }
