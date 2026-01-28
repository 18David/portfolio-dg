import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { isBrowser } from '../utils/ssr-utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    TranslateModule,
    MatButtonModule
  ],
  standalone: true
})
export class HomeComponent {
  private isBrowser = isBrowser();
  private clickSound: HTMLAudioElement | null = null;

  constructor() {
    if (this.isBrowser) {
      this.clickSound = new Audio('/assets/sounds/click.mp3');
    }
  }

  playClickSound(routeArg?: string) {
    if (this.clickSound) {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {});
    }
    if(routeArg && this.isBrowser) {
      setTimeout(() => {
        window.location.href = `/realisations?tag=${routeArg}`;
      }, 200);
    }
    else if (this.isBrowser) {
      setTimeout(() => {
        window.location.href = `/realisations`;
      }, 200);
    }
  }

}
