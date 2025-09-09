import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'realisations', component: RealisationsComponent },
  //{ path: 'projets', loadComponent: () => import('./projets/projets.component').then(m => m.ProjetsComponent) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
