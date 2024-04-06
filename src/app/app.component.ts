import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { UserService } from './core/services/user.service';
import { BlogService } from './core/services/blog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  title = 'jotjive';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll();
  }
}
