import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';


export type SeoData = {
  title?: string;
  description?: string;
  image?: string;   // URL absolue (pour OG/Twitter)
  type?: 'website'|'article'|'profile';
  canonical?: string; // URL absolue finale de la page
  jsonLd?: Record<string, any>; // Données structurées par page
  locale?: string; // ex: 'fr_FR'
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private r: Renderer2;

  constructor(
    private titleSrv: Title,
    private meta: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.r = this.rendererFactory.createRenderer(null, null);
  }

  update(data: SeoData) {
    // Title
    if (data.title) this.titleSrv.setTitle(data.title);

    // Description
    this.setTag('name', 'description', data.description ?? '');

    // Open Graph
    this.setTag('property', 'og:type', data.type ?? 'website');
    this.setTag('property', 'og:locale', data.locale ?? 'fr_FR');
    this.setTag('property', 'og:title', data.title ?? '');
    this.setTag('property', 'og:description', data.description ?? '');
    if (data.canonical) this.setTag('property', 'og:url', data.canonical);
    if (data.image) {
      this.setTag('property', 'og:image', data.image);
      this.setTag('name', 'twitter:image', data.image);
    }

    // Twitter
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', data.title ?? '');
    this.setTag('name', 'twitter:description', data.description ?? '');

    // Canonical
    if (data.canonical) this.setCanonical(data.canonical);

    // JSON-LD
    this.setJsonLd(data.jsonLd);
  }

  private setTag(attrName: 'name'|'property', attrValue: string, content: string) {
    if (!content) {
      // si vide, on évite d’injecter une meta inutile
      this.meta.removeTag(`${attrName}="${attrValue}"`);
      return;
    }
    this.meta.updateTag({ [attrName]: attrValue, content }, `${attrName}="${attrValue}"`);
  }

  private setCanonical(url: string) {
    // supprime les canonical existants
    const links = this.document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    links.forEach(l => l.parentElement?.removeChild(l));
    // ajoute un nouveau
    const linkEl = this.r.createElement('link') as HTMLLinkElement;
    linkEl.setAttribute('rel', 'canonical');
    linkEl.setAttribute('href', url);
    this.r.appendChild(this.document.head, linkEl);
  }

  private setJsonLd(json?: Record<string, any>) {
    // supprime l’ancien script JSON-LD (identifié par id)
    const old = this.document.getElementById('ld-json-page');
    if (old) old.remove();

    if (!json) return;

    const script = this.r.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'ld-json-page');
    script.text = JSON.stringify(json);
    this.r.appendChild(this.document.head, script);
  }
}
