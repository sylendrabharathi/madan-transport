import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, MenuController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language/language.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ApiService } from './services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

import { filter } from 'rxjs-compat/operator/filter';
import { Router } from '@angular/router';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  menus = [];
  backButtonSubscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private languageService: LanguageService,
    private translate: TranslateService,
    private lsService: LocalStorageService,
    private router: Router,
    private toaster: ToastService
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

  ionViewWillEnter() {
    // this.platform.backButton.subscribeWithPriority(0, async () => {
    //   console.log('-->>', this.routerOutlet.canGoBack());

    //   if (this.routerOutlet.canGoBack()) {
    //     this.routerOutlet.pop();
    //   }
    //   else if (!this.routerOutlet.canGoBack()) {
    //     navigator['app'].exitApp();
    //   }
    // });
    // this.languageService.getlanguageSubject().subscribe((res) => {
    //   if (res) {
    //     this.formMenuList();
    //   }
    // });
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
  ngOnInit() {
    this.formMenuList();
  }
  formMenuList() {
    let myLanguage = this.lsService.getMyLanguage();
    if (!myLanguage) {
      myLanguage = 'en';
    }
    this.translate.use(myLanguage);
    setTimeout(() => {

      var menuTitles;

      const menuIcons = ['home', 'bookmarks-outline', 'book-outline', 'bus-outline', 'man-outline', 'people-outline',
        'settings-outline', 'person-outline'];
      this.translate.get('init').subscribe((text: string) => {
        menuTitles = [this.translate.instant('menuTitles.Home'),
        this.translate.instant('menuTitles.Booking Enquires'),
        this.translate.instant('menuTitles.My Bookings'),
        this.translate.instant('menuTitles.Manage Vehicle'),
        this.translate.instant('menuTitles.Manage Driver'),
        this.translate.instant('menuTitles.Driver In Out'),
        // this.translate.instant('menuTitles.Track'),
        this.translate.instant('menuTitles.Settings'),
        this.translate.instant('menuTitles.My Profile')];
      });

      const menuLinks = ['home', 'booking-enquires', 'my-bookings', 'manage-vehicle', 'manage-driver', 'driver-in-out',
        'settings', 'my-profile'];
      const menus = [];
      console.log(menuTitles);

      for (let i = 0; i < menuTitles.length; i++) {
        const menuListItem = {
          icon: menuIcons[i],
          title: menuTitles[i],
          url: menuLinks[i]
        };
        menus.push(menuListItem);
      }
      this.menus = menus;
      console.log('menu', this.menus);

    }, 1000)

  }

  closeMenu() {
    this.menuCtrl.close();
  }



}
