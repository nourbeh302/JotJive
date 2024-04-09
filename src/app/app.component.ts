import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AuthModule } from '@angular/fire/auth';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  title: string = 'JotJive';

  private authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          photoUrl: user.photoURL!,
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
      console.log({ currentUser: this.authService.currentUserSignal() });
    });

  }
}
