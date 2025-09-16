import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'portfolio-dg';

  constructor(langService: LanguageService){
    langService.setLanguage('fr')
  }
}
