import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './bottom-nav.component.html'
})
export class BottomNavComponent {}
