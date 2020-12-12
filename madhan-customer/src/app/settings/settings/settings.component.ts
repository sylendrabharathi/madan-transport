import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  languages = [];
  selected = '';
  constructor(private languageService: LanguageService, private ls: LocalstorageService) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.ls.getMyLanguage();
  }
  select(data) {
    console.log('before', this.selected);
    this.languageService.setLanguage(data);
    this.ngOnInit();
  }

}
