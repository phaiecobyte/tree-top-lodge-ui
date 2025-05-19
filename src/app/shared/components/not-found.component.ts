import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container py-5 text-center">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="display-1">404</h1>
          <h2 class="mb-4">Page Not Found</h2>
          <p class="lead">The page you are looking for doesn't exist or has been moved.</p>
          <button class="btn btn-primary mt-3" routerLink="/">Return to Home</button>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}