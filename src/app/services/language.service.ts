import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { registerLocaleData, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { isBrowser } from '../utils/ssr-utils';

// Imports dynamiques des locales Angular
const localeMap: Record<'fr'|'en', () => Promise<any>> = {
  fr: () => import('@angular/common/locales/fr').then(m => m.default),
  en: () => import('@angular/common/locales/en-GB').then(m => m.default)
};

// Mapping Open Graph
const ogLocaleMap: Record<'fr'|'en', string> = {
  fr: 'fr_FR',
  en: 'en_GB'
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private browser = isBrowser();
  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    rendererFactory: RendererFactory2,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Initialise la langue au démarrage (user-agent / navigateur / fallback 'en')
   */
  async init() {
    let lang: 'fr'|'en' = 'en';

    if (this.browser) {
      const ua = (navigator.userAgent || '').toLowerCase();
      const nav = (navigator.language || '').toLowerCase();
      const isFrench = ua.includes('fr') || nav.startsWith('fr');
      lang = isFrench ? 'fr' : 'en';
    }

    await this.setLanguage(lang);
  }

  async setLanguage(lang: 'fr' | 'en') {
    // 1) Charger et enregistrer la locale Angular
    const locale = await localeMap[lang]();
    registerLocaleData(locale);

    // 2) Appliquer la traduction
    this.translate.use(lang);

    // 3) Mettre à jour <html lang="..."> — fonctionne aussi en SSR
    if (this.doc?.documentElement) {
      this.renderer.setAttribute(this.doc.documentElement, 'lang', lang);
    }

    // 4) Title & meta (OG locale au bon format)
    const t = await firstValueFrom(this.translate.get('app.title'));
    this.title.setTitle(t);
    this.meta.updateTag(
      { property: 'og:locale', content: ogLocaleMap[lang] },
      'property="og:locale"'
    );
  }

  get current(): 'fr'|'en' {
    return (this.translate.getCurrentLang() as 'fr'|'en') || 'en';
  }
}
