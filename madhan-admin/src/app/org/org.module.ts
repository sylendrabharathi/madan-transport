import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRoutingModule } from './org-routing.module';
import { OrgFormComponent } from './org-form/org-form.component';
import { IonicModule } from '@ionic/angular';
import { OrgListComponent } from './org-list/org-list.component';


@NgModule({
  declarations: [
    OrgFormComponent,
    OrgListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    OrgRoutingModule
  ]
})
export class OrgModule { }
