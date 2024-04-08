import { Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { BlogRoutingModule } from './blog/blog-routing.module';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => AuthRoutingModule },
  { path: 'feed', loadChildren: () => BlogRoutingModule },
];
