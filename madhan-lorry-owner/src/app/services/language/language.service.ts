import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

const LNG_KEY = 'SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';
  langaugeSubject = new BehaviorSubject<any>(1);
  constructor(private translate: TranslateService,
    private lsService: LocalStorageService,
    private storage: Storage) { }

  setInitialLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    })
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en' },
      { text: 'Tamil', value: 'ta' },
    ];
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.selected = lang;
    this.storage.set(LNG_KEY, lang);
    this.lsService.setmyLanguage(lang);
    this.setLanguageSubject(true);
  }

  setLanguageSubject(str) {
    this.langaugeSubject.next(str);
  }

  getlanguageSubject(): Observable<any> {
    return this.langaugeSubject.asObservable();
  }
}
