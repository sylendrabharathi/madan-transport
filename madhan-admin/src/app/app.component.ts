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

  menuList = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController) {
    this.initializeApp();
  }
  backButtonSubscription;
  ngOnInit() {
    this.formMenuList();
  }
  ionViewWillEnter() {

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(1, () => { navigator['app'].exitApp(); });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#6e33a1');
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  formMenuList() {
    // Removing Location and Reports
    const menuIcons = ['home', 'bus', 'document-text-outline', 'file-tray-stacked', 'book-outline', 'card-outline', 'man', 'people', 'podium', 'person-outline'];
    const menuTitles = ['Home', 'Enquiry Responses', 'LR', 'Rate Card', 'Booking Receipts', 'Booking Payments', 'Reference', 'Employee', 'ORG', 'My Profile'];
    const menuLinks = ['home', 'vehicle-details', 'lr', 'rate-card', 'booking-receipt', 'booking-payments', 'reference', 'employee', 'org', 'my-profile'];

    for (let i = 0; i < menuTitles.length; i++) {
      const menuListItem = {
        icon: menuIcons[i],
        title: menuTitles[i],
        url: menuLinks[i]
      };
      this.menuList.push(menuListItem);
    }
  }
}
