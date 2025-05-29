import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';
import { TextInputComponent } from '../../../shared/components/control/text-input.component';
import { PasswordInputComponent } from '../../../shared/components/control/password-input.component';
import { LoadingButtonComponent } from "../../../shared/components/ui/loading-btn.component";
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    PasswordInputComponent,
    LoadingButtonComponent
],
providers:[AuthService],
  template: ` 
  <div class="container mb-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow mt-5">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Login</h2>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Error Alert -->
            <div *ngIf="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            
            <!-- Username -->
            <app-text-input
              label="Username"
              type="text"
              formControlName="username"
            ></app-text-input>
            
            <!-- Password -->
            <app-password-input
              label="Password"
              formControlName="password"
            ></app-password-input>
            
            <!-- Submit Button -->
            <div class="d-grid">
              <app-loading-button
                type="submit"
                [loading]="loading"
                [disabled]="loginForm.invalid"
                loadingText="Logging in..."
                [block]="true"
              >Login</app-loading-button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.loading = false;
        // Navigate to dashboard or home page after successful login
        this.router.navigate(['admin/dashboard'])
        console.log('Login successful', response);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Failed to login. Please try again.';
        console.error('Login error:', err);
      }
    });
  }


}
