import { Component } from '@angular/core';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    FontAwesomeModule,
  ],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  faLinkedinIn = faLinkedinIn;

}
