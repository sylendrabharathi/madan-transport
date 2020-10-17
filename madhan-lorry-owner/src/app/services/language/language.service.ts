import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = ''
  constructor(private translate: TranslateService,
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
  }
}
