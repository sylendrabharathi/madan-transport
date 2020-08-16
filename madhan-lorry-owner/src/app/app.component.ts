import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.formMenuList();
  }


  formMenuList() {
    const menuIcons = ['home', 'bookmarks-outline', 'book-outline', 'bus-outline', 'man-outline', 'people-outline',
      'map-outline', 'settings-outline', 'person-outline'];
    const menuTitles = ['Home', 'Booking Enquires', 'My Bookings', 'Manage Vehicle', 'Manage Driver', 'Driver In Out',
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
