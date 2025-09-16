import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

// Imports dynamiques des locales Angular
const localeMap: Record<string, () => Promise<any>> = {
  fr: () => import('@angular/common/locales/fr').then(m => m.default),
  en: () => import('@angular/common/locales/en-GB').then(m => m.default),
  pt: () => import('@angular/common/locales/pt').then(m => m.default)
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    rendererFactory: RendererFactory2,
    private title: Title,
    private meta: Meta
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  async setLanguage(lang: 'fr' | 'en' | 'pt') {
    // 1) Charger locale Angular
    const locale = await localeMap[lang]();
    registerLocaleData(locale);

    // 2) Appliquer traduction
    this.translate.use(lang);
    localStorage.setItem('lang', lang);

    // 3) Mettre à jour l'attribut <html lang="">
    this.renderer.setAttribute(document.documentElement, 'lang', lang);

    // 4) Mettre à jour Title/Meta (exemple)
    this.translate.get('app.title').subscribe(t => this.title.setTitle(t));
    this.meta.updateTag({ name: 'og:locale', content: lang });
  }

  get current() {
    return this.translate.currentLang || 'fr';
  }
}
