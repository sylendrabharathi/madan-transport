import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { IonicModule } from '@ionic/angular';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@NgModule({
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
