import { Component, inject, signal } from '@angular/core';
import { Login } from '../data/login.interface';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../../app.component.css', './login.component.css'],
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  
  get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }
  
  get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }
  
  async onSubmit() {
    await this.authService.login(this.loginForm.value as Login);
    this.router.navigateByUrl('feed');
  }
}
