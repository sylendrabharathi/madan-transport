import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeApiService } from './service/api/home-api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule
  ],
  declarations: [HomePage],
  providers: [
    HomeApiService
  ]
})
export class HomePageModule { }
