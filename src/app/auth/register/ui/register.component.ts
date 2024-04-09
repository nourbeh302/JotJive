import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Register } from '../data/register.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['../../../app.component.css', './register.component.css'],
})
export class RegisterComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    photoUrl: ['', Validators.required],
  });

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      this.photoUrlControl.patchValue(file);
    }
  }

  // Helper method to get the photoUrl form control
  get photoUrlControl(): AbstractControl {
    return this.registerForm.get('photoUrl')!;
  }

  onSubmit() {
    const formData = this.registerForm.value;
    const photoFile = this.photoUrlControl.value;

    const downloadUrl = signal('');

    if (photoFile) {
      this.authService
        .uploadPhoto(photoFile)
        .then((response) => {
          downloadUrl.set(response);
          formData.photoUrl = downloadUrl();
          this.authService.register(formData as Register);
        })
        .catch((error) => console.log(error));
    }
  }
}
