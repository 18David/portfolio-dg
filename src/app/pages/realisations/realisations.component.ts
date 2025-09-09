import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from 'src/app/components/project-card/project-card.component';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
  standalone: true,
  imports: [
    ProjectCardComponent
  ]

})
export class RealisationsComponent implements OnInit {
  projects: Project[] = [];
  filter: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
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
    this.filter = keyword;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tag: keyword ?? undefined }, // undefined = supprime le param
      queryParamsHandling: ''                      // remplace
    });
  }
}
