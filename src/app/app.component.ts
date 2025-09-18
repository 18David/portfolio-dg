import { Component, Inject } from '@angular/core';
import { LanguageService } from './services/language.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SeoData, SeoService } from './core/seo/seo.service';
import { filter, map, mergeMap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  private baseUrl = 'https://dgportfolio.eu';

  title = 'portfolio-dg';

  constructor(
    private  langService: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService,
  ){
    this.langService.init();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.route),
        map((r) => {
          while (r.firstChild) r = r.firstChild;
          return r;
        }),
        mergeMap((r) => r.data)
      )
      .subscribe((data: any) => {
        const url = this.baseUrl + this.router.url.split('?')[0];
        const seoData: SeoData = {
          title: data['seo']?.title,
          description: data['seo']?.description,
          image: data['seo']?.image,
          type: data['seo']?.type ?? 'website',
          canonical: url,
          jsonLd: data['seo']?.jsonLd,
          locale: 'fr_FR',
        };
        this.seo.update(seoData);
      });
  }
}
