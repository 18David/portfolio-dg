import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { isBrowser } from 'src/app/utils/ssr-utils';

@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  standalone: true,
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
  current = this.langService.current;
  currentLabel = this.langs.find(l => l.code === this.current)?.label ?? '';

  private clickSound: HTMLAudioElement | null = null;



  constructor(private langService: LanguageService) {
    if (isBrowser()) {
      this.clickSound = new Audio('/assets/sounds/click.mp3');
    }
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
     if (!this.clickSound) return; // SSR: pas d’audio
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }
}
