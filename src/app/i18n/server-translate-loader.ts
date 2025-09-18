import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';

// ⚠️ imports Node uniquement côté serveur
// (ts-ignore pour éviter les warnings en build browser)
 // @ts-ignore
import { readFileSync } from 'node:fs';
 // @ts-ignore
import { join } from 'node:path';

@Injectable()
export class ServerTranslateLoader implements TranslateLoader {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getTranslation(lang: string): Observable<any> {
    if (!isPlatformServer(this.platformId)) {
      return throwError(() => new Error('ServerTranslateLoader used on browser'));
    }
    // Lis directement les fichiers de source (présents au moment du prerender)
    const file = join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
    try {
      const json = readFileSync(file, 'utf8');
      return of(JSON.parse(json));
    } catch (e: any) {
      // Evite de faire planter le prerender : renvoie un dico vide si le fichier manque
      return of({});
    }
  }
}
