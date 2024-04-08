import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../data/blog.interface';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  private blogService: BlogService = inject(BlogService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private blogs: Blog[] = []

  logOut() {
    this.authService.logOut();

    this.router.navigateByUrl('/auth/login');
  }

  onInit() {
    this.blogService.getAll();
  }
}
