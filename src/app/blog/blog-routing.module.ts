import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feed/ui/feed.component').then((c) => c.FeedComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/ui/create.component').then((c) => c.CreateComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
