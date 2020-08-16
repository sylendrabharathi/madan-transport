import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsApiService } from './services/api/settings-api.service';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule, 
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  providers: [
    SettingsApiService
  ]
})
export class SettingsModule { }
