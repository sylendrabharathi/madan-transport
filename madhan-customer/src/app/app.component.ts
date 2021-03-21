import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, MenuController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './service/language/language.service';
import { LocalstorageService } from './service/localstorage/localstorage.service';
import { Router } from '@angular/router';
import { ToastService } from './service/toast/toast.service';

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
    private translate: TranslateService,
    private lsService: LocalstorageService,
    private languageService: LanguageService,
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

  ngOnInit() {
    this.formMenuList();
    // this.languageService.getlanguageSubject().subscribe((res) => {
    //   if (res) {
    //     this.formMenuList();
    //   }
    // })

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
    let myLanguage = this.lsService.getMyLanguage();
    if (!myLanguage) {
      myLanguage = 'en';
    }
    this.translate.use(myLanguage);
    setTimeout(() => {

      var menuTitles;
      this.translate.get('init').subscribe((text: string) => {
        menuTitles = [this.translate.instant('menuTitles.Home'),
        this.translate.instant('menuTitles.New Booking'),
        this.translate.instant('menuTitles.My Bookings'),
        this.translate.instant('menuTitles.Manage Consigner'),
        this.translate.instant('menuTitles.Manage POL&POD'),
        this.translate.instant('menuTitles.Settings'),
        this.translate.instant('menuTitles.My Profile')];
      });
      const menuIcons = ['home', 'add-outline', 'book-outline', 'basket-outline', 'chevron-up-outline', 'settings-outline', 'person-outline'];

      const menuLinks = ['home', 'new-booking', 'my-bookings', 'manage-consigner', 'manage-pol-pod', 'settings', 'my-profile'];
      for (let i = 0; i < menuTitles.length; i++) {
        const menuListItem = {
          icon: menuIcons[i],
          title: menuTitles[i],
          url: menuLinks[i]
        };
        this.menus.push(menuListItem);
      }
    }, 1000)
  }
}
