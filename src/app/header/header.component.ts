
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '../components/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'header',
  imports: [
    RouterModule,
    LanguageSwitcherComponent,
    TranslateModule
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links = [
    { key: 'home', path: '/', exact: true },
    { key: 'projects', path: '/realisations', exact: false },
    { key: 'contact', path: '/contact', exact: false }
  ];
}
