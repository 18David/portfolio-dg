import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [

    MatButtonModule
  ],
  standalone: true
})
export class HomeComponent {

  clickSound = new Audio('/assets/sounds/click.mp3');

  playClickSound(routeArg?: string) {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
    if(routeArg) {
      setTimeout(() => {
        window.location.href = `/realisations?tag=${routeArg}`;
      }, 200);
    }
  }

}
