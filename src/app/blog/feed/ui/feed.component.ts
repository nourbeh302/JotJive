import { Component, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../data/blog.interface';
import { User } from '../../../core/interfaces/user.interface';

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
  blogs: Blog[] = [];

  user: WritableSignal<User | null | undefined> = signal(null);

  logOut() {
    this.authService.logOut();

    this.router.navigateByUrl('/auth/login');
  }

  ngOnInit() {
    this.user.set(this.authService.currentUserSignal());

    this.blogService.getAll().then((response) => (this.blogs = response));
  }
}
