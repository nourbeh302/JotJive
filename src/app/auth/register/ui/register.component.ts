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

  photoUrl: string | null = null;

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    photoUrl: ['', Validators.required],
  });

  // onFileSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;

  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const file: File = fileInput.files[0];
  //     this.photoUrlControl.patchValue(file);
  //     this.photoUrl = file.name as string;
  //   }
  // }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const reader = new FileReader();

    if (fileInput.files && fileInput.files[0]) {
      // View image in the UI
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = (e) => (this.photoUrl = reader.result as string);

      // Upload the actual file
      const file: File = fileInput.files[0];
      this.photoUrlControl.patchValue(file);
    }
  }

  get photoUrlControl(): AbstractControl {
    return this.registerForm.get('photoUrl')!;
  }

  async onSubmit() {
    const formData = this.registerForm.value;
    const photoFile = this.photoUrlControl.value;

    if (photoFile) {
      try {
        const downloadUrl = await this.authService.uploadPhoto(photoFile);
        formData.photoUrl = downloadUrl;
        await this.authService.register(formData as Register);
      } catch (error) {
        console.error('Error uploading photo or registering:', error);
      }
    } else {
      this.authService.register(formData as Register);
    }
  }
}
