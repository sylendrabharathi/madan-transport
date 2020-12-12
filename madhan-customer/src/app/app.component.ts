import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './service/language/language.service';
import { LocalstorageService } from './service/localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  menus = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private translate: TranslateService,
    private lsService: LocalstorageService,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#6e33a1');
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.languageService.setInitialLanguage();
    });
  }

  ngOnInit() {
    this.formMenuList();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  formMenuList() {
    let myLanguage = this.lsService.getMyLanguage();
    if (!myLanguage) {
      myLanguage = 'en';
    }
    this.translate.use(myLanguage);
    setTimeout(() => {
      console.log(this.translate.instant('menuTitles.Home'));

      const menuTitles = [this.translate.instant('menuTitles.Home'),
      this.translate.instant('menuTitles.New Booking'),
      this.translate.instant('menuTitles.My Bookings'),
      this.translate.instant('menuTitles.Manage Consigner'),
      this.translate.instant('menuTitles.Manage POL&POD'),
      this.translate.instant('menuTitles.Settings'),
      this.translate.instant('menuTitles.My Profile')];
      const menuIcons = ['home', 'add-outline', 'book-outline', 'basket-outline', 'chevron-up-outline', 'settings-outline', 'person-outline'];
      // const menuTitles = ['Home', 'New Booking', 'My Bookings', 'Manage Consigner', 'Manage POL & POD', 'Settings', 'My Profile'];
      const menuLinks = ['home', 'new-booking', 'my-bookings', 'manage-consigner', 'manage-pol-pod', 'settings', 'my-profile'];
      for (let i = 0; i < menuTitles.length; i++) {
        const menuListItem = {
          icon: menuIcons[i],
          title: menuTitles[i],
          url: menuLinks[i]
        };
        this.menus.push(menuListItem);
      }
    }, 200)
  }
}
