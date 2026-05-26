import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  // Form group definition
  readonly loginForm: FormGroup = this._fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // UI state using signals
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { username, password } = this.loginForm.value;

    try {
      const success = await this._authService.login(username, password);
      
      if (success) {
        const role = this._authService.userRole();
        if (role === 'ADMIN') {
          await this._router.navigate(['/admin']);
        } else if (role === 'STUDENT') {
          await this._router.navigate(['/student']);
        }
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos. Revisa la especificación para usar las credenciales de prueba.');
      }
    } catch (error) {
      this.errorMessage.set('Ocurrió un error inesperado durante el inicio de sesión.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
