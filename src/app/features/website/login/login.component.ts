import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow mt-5">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Admin Login</h2>
              
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              
              <form (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    [(ngModel)]="email"
                    name="email"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    [(ngModel)]="password"
                    name="password"
                    required
                  >
                </div>
                
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  [disabled]="isLoading"
                >
                  <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/admin/accommodations']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password.';
        this.isLoading = false;
      }
    });
  }
}