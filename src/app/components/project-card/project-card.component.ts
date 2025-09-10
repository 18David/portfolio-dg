import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { DatePipe } from '@angular/common';
import {SafeUrlPipe} from '../../pipes/safe-url.pipe';


@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  imports: [
    DatePipe,
    SafeUrlPipe
  ],
  standalone: true,
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  showDetails = false;

  clickSound = new Audio('/assets/sounds/click.mp3');

  current = 0;
  progress = 0;                // 0..1 for current segment
  auto = true;
  hovering = false;
  readonly slideDuration = 5000; // ms

  private rafId: number | null = null;
  private lastTs = 0;

  playClickSound() {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }

  toggleDetails() {
    this.playClickSound();
    this.showDetails = !this.showDetails;
  }

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  // ------- Carousel control -------
  start() {
    if (!this.hasMultiple) return;
    if (this.rafId !== null) return;
    this.lastTs = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const tick = (ts: number) => {
      const now = ts || (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const dt = now - this.lastTs;
      this.lastTs = now;

      if (this.auto && !this.hovering) {
        this.progress += dt / this.slideDuration;
        if (this.progress >= 1) {
          this.next();
          this.progress = 0;
        }
      }
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  get hasMultiple() {
    return (this.project?.media?.length || 0) > 1;
  }

  prev(sound?: boolean) {
    if(sound) this.playClickSound();
    const n = this.project.media.length;
    this.current = (this.current - 1 + n) % n;
    this.progress = 0;
  }

  next(sound?: boolean) {
    if(sound) this.playClickSound();
    const n = this.project.media.length;
    this.current = (this.current + 1) % n;
    this.progress = 0;
  }

  go(i: number) {
    this.current = i;
    this.progress = 0;
  }

  toggleAuto() {
    this.auto = !this.auto;
  }

  // Progress fill for a segment i (0..100)
  segmentFill(i: number): number {
    if (i < this.current) return 100;
    if (i > this.current) return 0;
    return Math.max(0, Math.min(100, this.progress * 100));
  }
}
