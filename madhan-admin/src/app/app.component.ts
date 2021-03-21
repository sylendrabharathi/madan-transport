import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ToastService } from './service/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  menuList = [];
  backButtonSubscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private toaster: ToastService) {
    this.initializeApp();
  }

  ngOnInit() {
    this.formMenuList();
  }
  // ionViewWillEnter() {

  //   this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(666666, () => { navigator['app'].exitApp(); });
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#6e33a1');
      this.splashScreen.hide();
    });
  }
  ngAfterViewInit() {
    this.backButtonEvent();
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, async () => {
      console.log('-->>', this.routerOutlet.canGoBack(), this.router.url);
      if (this.router.url === '/home') {
        navigator['app'].exitApp(); // work in ionic 4
      }
      else if (this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }
      else {
        const toast = await this.toaster.warning('Press back again to exit App.');
      }
    });

  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  closeMenu() {
    this.menuCtrl.close();
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
