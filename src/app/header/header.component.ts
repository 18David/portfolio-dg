
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isBrowser } from '../ssr';


@Component({
  selector: 'header',
  imports: [
    RouterModule,
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
  private isBrowser = isBrowser();
  private clickSound: HTMLAudioElement | null = null;
  constructor(public router: Router) {

    if (this.isBrowser) {
      this.clickSound = new Audio('/assets/sounds/click.mp3');
    }
  }

  playClickSound() {
    if (this.clickSound) {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {});
    }
  }

  isLinkActive(path: string, exact: boolean) {
    return this.router.isActive(path, {
      paths: exact ? 'exact' : 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
