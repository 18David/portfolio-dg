import { Component } from '@angular/core';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    FontAwesomeModule,
    TranslateModule
  ],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  faLinkedinIn = faLinkedinIn;

}
