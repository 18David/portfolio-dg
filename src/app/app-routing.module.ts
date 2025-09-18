import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'David Gonçalves | Développeur Full-Stack Angular & Unity/XR',
        description: 'Projets Angular/Node, Unity/XR, IoT & Home Assistant. Démos, réalisations et contact.',
        image: 'https://dgportfolio.eu//assets/social/og-cover.jpg',
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Accueil',
          url: 'https://dgportfolio.eu//'
        }
      }
    }
  },
  {
    path: 'realisations',
    loadComponent: () => import('./pages/realisations/realisations.component').then(m => m.RealisationsComponent),
    data: {
      seo: {
        title: 'Réalisations — Projets Web, XR & IoT | David Gonçalves',
        description: 'Sélection de projets: Angular, Node.js, Unity/XR, ESPHome, Home Assistant, OBS.',
        image: 'https://dgportfolio.eu//assets/social/og-realisations.jpg',
        type: 'website'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: {
      seo: {
        title: 'Contact | David Gonçalves',
        description: 'Discutons de vos besoins en développement web (Angular/Node) ou XR (Unity).',
        image: 'https://dgportfolio.eu//assets/social/og-contact.jpg',
        type: 'website'
      }
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
