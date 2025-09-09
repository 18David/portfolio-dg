import { Component, Input } from '@angular/core';
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
export class ProjectCardComponent {
  @Input() project!: Project;
  showDetails = false;

  clickSound = new Audio('/assets/sounds/click.mp3');

  playClickSound() {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }

  toggleDetails() {
    this.playClickSound();
    this.showDetails = !this.showDetails;
  }
}
