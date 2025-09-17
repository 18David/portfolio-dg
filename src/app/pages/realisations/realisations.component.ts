import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from 'src/app/components/project-card/project-card.component';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlipListDirective } from 'src/app/shared/flip-list.directive';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

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

  projects: Project[] = [];
  filter: string | null = null;


  clickSound = new Audio('/assets/sounds/click.mp3');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
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
      queryParams: { tag: keyword ?? undefined }, // undefined = supprime le param
    });

    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      // micro-décalage pour être sûr d’avoir le layout final
      requestAnimationFrame(() => {
        const movedNow = this.flip?.play() ?? false;

        // 4) Si aucun mouvement (cas RETRAITS), rejoue après le leave
        if (!movedNow) {
          setTimeout(() => {
            // petit raf pour être sûr que le retrait a fini et le layout est recomposé
            requestAnimationFrame(() => this.flip?.play());
          }, LEAVE_MS);
        }
      });
    });
  }

  playClickSound() {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }
// Removed unused stub functions for Angular animations, as they are now imported from '@angular/animations'
}

