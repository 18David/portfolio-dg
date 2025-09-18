import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from 'src/app/components/project-card/project-card.component';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlipListDirective } from 'src/app/shared/flip-list.directive';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { isBrowser } from 'src/app/utils/ssr-utils';


const LEAVE_MS = 200; // doit matcher ta transition .card-leave

@Component({
  selector: 'realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
  standalone: true,
  imports: [
    ProjectCardComponent,
    FlipListDirective,
    TranslateModule
  ]

})
export class RealisationsComponent implements OnInit {
  @ViewChild(FlipListDirective) flip!: FlipListDirective;

  private readonly browser = isBrowser();

  private clickSound: HTMLAudioElement | null = null;

  projects: Project[] = [];
  filter: string | null = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private ngZone: NgZone,
  ) {
    if (this.browser) {
      this.clickSound = new Audio('/assets/sounds/click.mp3');
    }
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data ?? [];
    });

    this.route.queryParamMap.subscribe(params => {
      const tag = params.get('tag');
      this.filter = tag && tag.length ? tag : null;
    });
  }

  get filteredProjects() {
    if (!this.filter) return this.projects;

    return this.projects.filter(p => p.keywords.includes(this.filter!));
  }

  setFilter(keyword: string | null) {

    if( this.filter === keyword ) return;

    this.flip?.prepare();

    this.playClickSound();

    this.filter = keyword;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tag: keyword ?? undefined },
    });

    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      if (!this.browser) return;

      const raf = (globalThis as any).requestAnimationFrame as
        | ((cb: (ts: number) => void) => number)
        | undefined;

      if (!raf) return;

      raf(() => {
        const movedNow = this.flip?.play() ?? false;

        if (!movedNow) {
          setTimeout(() => {
            const raf2 = (globalThis as any).requestAnimationFrame as
              | ((cb: FrameRequestCallback) => number)
              | undefined;
            if (raf2) raf2(() => this.flip?.play());
          }, LEAVE_MS);
        }
      });
    });
  }

  playClickSound() {
    if (!this.clickSound) return;
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }
// Removed unused stub functions for Angular animations, as they are now imported from '@angular/animations'
}

