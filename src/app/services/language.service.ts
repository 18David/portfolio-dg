import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { isBrowser } from '../utils/ssr-utils';

// Imports dynamiques des locales Angular
const localeMap: Record<string, () => Promise<any>> = {
  fr: () => import('@angular/common/locales/fr').then(m => m.default),
  en: () => import('@angular/common/locales/en-GB').then(m => m.default),
  pt: () => import('@angular/common/locales/pt').then(m => m.default)
};

// Mapping vers le format Open Graph attendu
const ogLocaleMap: Record<'fr'|'en'|'pt', string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_PT'
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private browser = isBrowser();
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
    if(this.browser){
      try { localStorage.setItem('lang', lang); } catch {}
      this.renderer.setAttribute(document.documentElement, 'lang', lang);
    }

    // 4) Mettre à jour Title/Meta (exemple)
    this.translate.get('app.title').subscribe(t => this.title.setTitle(t));
    this.meta.updateTag({ property: 'og:locale', content: ogLocaleMap[lang] });
  }

  get current() {
    return (this.translate.getCurrentLang() as 'fr'|'en'|'pt') || 'fr';
  }
}
