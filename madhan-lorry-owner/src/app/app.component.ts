import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language/language.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';

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
    private languageService: LanguageService,
    private translate: TranslateService,
    private lsService: LocalStorageService
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
    this.languageService.getlanguageSubject().subscribe((res) => {
      if (res) {
        this.formMenuList();
      }
    })

  }


  formMenuList() {
    let myLanguage = this.lsService.getMyLanguage();
    if (!myLanguage) {
      myLanguage = 'en';
    }
    this.translate.use(myLanguage);
    setTimeout(() => {
      console.log(this.translate.instant('menuTitles.Home'));
      var Enquires = this.translate.get('menuTitles.Booking Enquires');
      const menuIcons = ['home', 'bookmarks-outline', 'book-outline', 'bus-outline', 'man-outline', 'people-outline',
        'map-outline', 'settings-outline', 'person-outline'];
      const menuTitles = [this.translate.instant('menuTitles.Home'),
      this.translate.instant('menuTitles.Booking Enquires'),
      this.translate.instant('menuTitles.My Bookings'),
      this.translate.instant('menuTitles.Manage Vehicle'),
      this.translate.instant('menuTitles.Manage Driver'),
      this.translate.instant('menuTitles.Driver In Out'),
      this.translate.instant('menuTitles.Track'),
      this.translate.instant('menuTitles.Settings'),
      this.translate.instant('menuTitles.My Profile')];
      const menuLinks = ['home', 'booking-enquires', 'my-bookings', 'manage-vehicle', 'manage-driver', 'driver-in-out',
        'track', 'settings', 'my-profile'];
      const menus = [];
      for (let i = 0; i < menuTitles.length; i++) {
        const menuListItem = {
          icon: menuIcons[i],
          title: menuTitles[i],
          url: menuLinks[i]
        };
        menus.push(menuListItem);
      }
      this.menus = menus;

    }, 200)



  }

  closeMenu() {
    this.menuCtrl.close();
  }

  getLocalTxt() {

  }

}
