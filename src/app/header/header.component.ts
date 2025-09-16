import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '../components/language-switcher/language-switcher.component';

@Component({
  selector: 'header',
  imports: [
    RouterModule,
    CommonModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'Réalisations', path: '/realisations', exact: false },
    { label: 'Contact', path: '/contact', exact: false }
  ];
}
