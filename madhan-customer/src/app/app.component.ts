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
  
  closeMenu() {
    this.menuCtrl.close();
  }

  formMenuList() {
    const menuIcons = ['home', 'book-outline', 'basket-outline', 'chevron-up-outline', 'settings-outline', 'person-outline'];
    const menuTitles = ['Home', 'My Bookings', 'Manage Consigner', 'Manage POL & POD', 'Settings', 'My Profile'];
    const menuLinks = ['home', 'my-bookings', 'manage-consigner', 'manage-pol-pod', 'settings', 'my-profile'];
    for (let i = 0; i < menuTitles.length; i++) {
      const menuListItem = {
        icon: menuIcons[i],
        title: menuTitles[i],
        url: menuLinks[i]
      };
      this.menus.push(menuListItem);
    }
  }
}
