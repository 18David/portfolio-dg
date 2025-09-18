// src/app/shared/flip-list.directive.ts
import { Directive, ElementRef, Input } from '@angular/core';
import { isBrowser } from '../utils/ssr-utils';


type FlipOpts = number | { duration?: number; easing?: string; threshold?: number };

@Directive({
  selector: '[appFlipList]',
  standalone: true
})
export class FlipListDirective {
  @Input('appFlipList') set opts(v: FlipOpts) {
    if (typeof v === 'number') this.duration = v;
    else if (v) {
      this.duration = v.duration  ?? this.duration;
      this.easing   = v.easing    ?? this.easing;
      this.threshold = v.threshold ?? this.threshold;
    }
  }

  private duration = 320;
  private easing   = 'cubic-bezier(0.22, 1, 0.36, 1)';
  private threshold = 0.5; // px
  private prev = new Map<string, DOMRect>();
  private isBrowser = isBrowser();

  constructor(private host: ElementRef<HTMLElement>) {}

  /** Snapshot AVANT la mutation de liste */
  prepare() {
    this.prev.clear();
    for (const el of this.items()) {
      const key = el.getAttribute('data-flip-key');
      if (!key) continue;
      this.prev.set(key, el.getBoundingClientRect());
    }
  }

  /**
   * Joue le FLIP APRÈS la MAJ du DOM.
   * Retourne true s’il y a eu AU MOINS un déplacement animé.
   * Si aucun déplacement, ne "commit" PAS les positions (pour permettre un second tir).
   */
  play(): boolean {
    if(this.isBrowser){
      if (matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        this.prev.clear(); return false;
      }
    }

    const curr = new Map<string, DOMRect>();
    let moved = 0;

    for (const el of this.items()) {
      const key = el.getAttribute('data-flip-key');
      if (!key) continue;

      const now = el.getBoundingClientRect();
      curr.set(key, now);

      const was = this.prev.get(key);
      if (!was) continue;

      const dx = was.left - now.left;
      const dy = was.top  - now.top;
      if (Math.abs(dx) < this.threshold && Math.abs(dy) < this.threshold) continue;

      moved++;
      el.style.willChange = 'transform';
      el.style.transition = 'none';
      el.style.transform  = `translate(${dx}px, ${dy}px)`;
      void el.offsetWidth; // reflow
      el.style.transition = `transform ${this.duration}ms ${this.easing}`;
      el.style.transform  = '';

      const done = () => {
        el.style.willChange = '';
        el.style.transition = '';
        el.removeEventListener('transitionend', done);
      };
      el.addEventListener('transitionend', done);
    }

    // Commit uniquement s’il y a eu du mouvement
    if (moved > 0) this.prev = curr;

    return moved > 0;
  }

  private items(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-flip-key]'));
  }
}
