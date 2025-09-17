import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule
  ]
})
export class LanguageSwitcherComponent {
  langs: Array<{code:'fr'|'en'|'pt'; label:string}> = [
    { code: 'fr', label: 'Fr' },
    { code: 'en', label: 'En' },
    { code: 'pt', label: 'Pt' }
  ];
  currentLabel = ""
  current = this.langService.current;

  clickSound = new Audio('/assets/sounds/click.mp3');



  constructor(private langService: LanguageService) {
    this.currentLabel = this.langs.find(l => l.code === this.current)?.label ?? '';
  }

  async set(lang: 'fr'|'en'|'pt') {
    if(this.current==lang) return;
    this.playClickSound()
    await this.langService.setLanguage(lang);
    this.current = lang;
    //get label from langs langs[].code === lang
    this.currentLabel = this.langs.find(l => l.code === lang)?.label ?? '';
  }

  playClickSound() {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }
}
