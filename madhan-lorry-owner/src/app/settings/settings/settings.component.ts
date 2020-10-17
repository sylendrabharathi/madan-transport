import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // choosen = 'false';
  languages = [];
  selected = '';
  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
  select(data) {
    console.log('before', this.selected);
    this.languageService.setLanguage(data);
    this.ngOnInit();
  }
}
