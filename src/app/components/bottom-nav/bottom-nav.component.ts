import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isBrowser } from '../../utils/ssr-utils';

@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './bottom-nav.component.html'
})
export class BottomNavComponent {
  private clickSound: HTMLAudioElement | null = null;

  constructor() {
    if (isBrowser()) {
      this.clickSound = new Audio('/assets/sounds/click.mp3');
    }
  }

  playClickSound() {
    if (!this.clickSound) return; // SSR ou audio non chargé
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play().catch(() => {
      // ignore les erreurs (ex: autoplay policy)
    });
  }
}
