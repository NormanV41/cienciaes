import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { LastEpisodesComponent } from './last-episodes/last-episodes.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomeComponent,
    children: [{ path: ':id', component: LastEpisodesComponent }]
  },
  { path: '', redirectTo: '/home/tabs/main' }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class HomeRoutingModule {}
