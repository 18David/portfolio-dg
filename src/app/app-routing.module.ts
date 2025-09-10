import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'realisations', component: RealisationsComponent },
  { path: 'contact', component: ContactComponent },

  //{ path: 'projets', loadComponent: () => import('./projets/projets.component').then(m => m.ProjetsComponent) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
