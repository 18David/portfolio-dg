import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  // Chemin absolu pour être robuste avec base-href et en SSR
  private readonly jsonUrl = '/assets/projects.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.jsonUrl).pipe(
      // En SSR (ou si le fichier manque), on évite de faire planter le prerender
      catchError(() => of([] as Project[]))
    );
  }
}
