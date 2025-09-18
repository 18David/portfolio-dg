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
  clickSound = new Audio('/assets/sounds/click.mp3');

  playClickSound(routeArg?: string) {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
    if(routeArg && this.isBrowser) {
      setTimeout(() => {
        window.location.href = `/realisations?tag=${routeArg}`;
      }, 200);
    }
  }

}
