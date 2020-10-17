import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfileApiService } from './services/api/my-profile-api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MyProfileRoutingModule,
    TranslateModule
  ],
  providers: [
    MyProfileApiService
  ]
})
export class MyProfileModule { }
