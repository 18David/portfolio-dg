import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  faLinkedinIn = faLinkedinIn;
  sending = false;
  done = false;
  error: string | null = null;

  clickSound = new Audio('/assets/sounds/click.mp3');


  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit() {
    this.error = null;
    this.done = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending = true;
    this.http.post('/api/contact', this.form.value).subscribe({
      next: () => {
        this.sending = false;
        this.done = true;
        this.form.reset();
      },
      error: (err) => {
        this.sending = false;
        this.error = err?.error?.message ?? 'Une erreur est survenue. Réessaie plus tard.';
      }
    });
  }

  get f() { return this.form.controls; }

  playClickSound() {
    this.clickSound.currentTime = 0; // reset pour spam rapide
    this.clickSound.play();
  }
}
