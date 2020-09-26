import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { ApiService } from './service/api/api.service';
import { ManageConsignerModule } from './manage-consigner/manage-consigner.module';
import { MyBookingsModule } from './my-bookings/my-bookings.module';
import { ManagePolPodModule } from './manage-pol-pod/manage-pol-pod.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { LocalstorageService } from './service/localstorage/localstorage.service';
import { SharedService } from './service/shared/shared.service';
import { ToastService } from './service/toast/toast.service';

@NgModule({
  declarations: [
    AppComponent, 
    SignupComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManageConsignerModule,
    MyBookingsModule,
    ManagePolPodModule,
    ProfileModule,
    SettingsModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    LocalstorageService,
    SharedService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
