import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language/language.service';

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
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#6e33a1');
      this.splashScreen.hide();
      this.languageService.setInitialLanguage();
    });


  }

  ngOnInit() {
    this.formMenuList();
    console.log('tesgt');

  }


  formMenuList() {
    var home = this.translate.get('menuTitles.Home').subscribe(data => {
      console.log('data', data);

    })
    console.log('home', home);

    var Enquires = this.translate.get('menuTitles.Booking Enquires');
    const menuIcons = ['home', 'bookmarks-outline', 'book-outline', 'bus-outline', 'man-outline', 'people-outline',
      'map-outline', 'settings-outline', 'person-outline'];
    const menuTitles = [home, Enquires, 'My Bookings', 'Manage Vehicle', 'Manage Driver', 'Driver In Out',
      'Track', 'Settings', 'My Profile'];
    const menuLinks = ['home', 'booking-enquires', 'my-bookings', 'manage-vehicle', 'manage-driver', 'driver-in-out',
      'track', 'settings', 'my-profile'];
    for (let i = 0; i < menuTitles.length; i++) {
      const menuListItem = {
        icon: menuIcons[i],
        title: menuTitles[i],
        url: menuLinks[i]
      };
      this.menus.push(menuListItem);
    }
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}
