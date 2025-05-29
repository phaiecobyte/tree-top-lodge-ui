import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 text-center">
      <div class="alert alert-info">
        <h2>Coming Soon</h2>
        <p class="lead">The {{pageName}} page is currently under development.</p>
        <p>We're working hard to bring you amazing content for this section!</p>
        <button class="btn btn-primary mt-3" routerLink="/">Return to Home</button>
      </div>
    </div>
  `
})
export class PlaceholderComponent implements OnInit {
  pageName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Extract the current route path to display in the template
    const path = this.router.url.split('/')[1];
    this.pageName = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  }
}