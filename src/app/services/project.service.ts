import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { isBrowser } from '../utils/ssr-utils';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private browser = isBrowser();
  private jsonUrl = 'assets/projects.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    if (!this.browser) {
      // en SSR, tu peux retourner un Observable vide
      return this.http.get<any[]>(this.jsonUrl);
    }
    return this.http.get<Project[]>(this.jsonUrl);
  }
}
