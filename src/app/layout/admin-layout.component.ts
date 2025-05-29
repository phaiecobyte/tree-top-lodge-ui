import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="admin-layout d-flex">
      <!-- Sidebar -->
      <nav id="sidebar" class="bg-primary text-white">
        <div class="p-4">
          <div class="d-flex align-items-center mb-4">
            <img src="assets/images/logo-Treetop-lodge.png" alt="Tree Top Lodge" class="sidebar-logo me-3">
            <h5 class="m-0">Admin Panel</h5>
          </div>
          
          <div class="d-md-none text-end mb-3">
            <button class="btn btn-sm btn-outline-light" id="sidebarCollapseBtn">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <hr>
          
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/dashboard" routerLinkActive="active">
                <i class="bi bi-speedometer2 me-3"></i> Dashboard
              </a>
            </li>
            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/accommodations" routerLinkActive="active">
                <i class="bi bi-house me-3"></i> Accommodations
              </a>
            </li>
            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/category" routerLinkActive="active">
                <i class="bi bi-calendar-check me-3"></i> Category
              </a>
            </li>
            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/food-beverage" routerLinkActive="active">
                <i class="bi bi-cup-hot me-3"></i> Food & Beverage
              </a>
            </li>

            <hr/>

            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/users" routerLinkActive="active">
                <i class="bi bi-people me-3"></i> Users
              </a>
            </li>
            <li class="nav-item mb-2">
              <a class="nav-link text-white d-flex align-items-center" routerLink="/admin/settings" routerLinkActive="active">
                <i class="bi bi-gear me-3"></i> Settings
              </a>
            </li>
          </ul>
          
          <hr>
          
          <div class="d-flex flex-column">
            <button class="btn btn-outline-light btn-sm mb-2" (click)="logout()">
              <i class="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div id="content" class="flex-grow-1">
        <!-- Top Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div class="container-fluid">
            <button class="btn d-md-none me-3" id="sidebarToggle">
              <i class="bi bi-list"></i>
            </button>
            
            <div class="flex-grow-1"></div>
            
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-bell me-2"></i>
                  <span class="badge bg-danger rounded-pill">3</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><h6 class="dropdown-header">Notifications</h6></li>
                  <li><a class="dropdown-item" href="#">New booking #12345</a></li>
                  <li><a class="dropdown-item" href="#">Payment received</a></li>
                  <li><a class="dropdown-item" href="#">System update required</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown ms-3">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="assets/images/avatar.png" class="avatar-sm rounded-circle me-2" alt="Admin User">
                  <span>Admin</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" (click)="logout()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Page Content -->
        <div class="container-fluid p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout {
      min-height: 100vh;
      overflow-x: hidden;
    }

    #sidebar {
      width: 260px;
      min-height: 100vh;
      transition: all 0.3s;
    }

    #sidebar.collapsed {
      margin-left: -260px;
    }

    #content {
      width: calc(100% - 260px);
      transition: all 0.3s;
    }

    #content.expanded {
      width: 100%;
    }

    .sidebar-logo {
      max-width: 40px;
    }

    .avatar-sm {
      width: 32px;
      height: 32px;
    }

    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      #sidebar {
        margin-left: -260px;
        position: fixed;
        z-index: 1050;
        height: 100%;
      }

      #sidebar.show {
        margin-left: 0;
      }

      #content {
        width: 100%;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit() {
    this.setupSidebarToggle();
  }

  setupSidebarToggle() {
    setTimeout(() => {
      const sidebarToggleBtn = document.getElementById('sidebarToggle');
      const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
      const sidebar = document.getElementById('sidebar');
      const content = document.getElementById('content');

      if (sidebarToggleBtn && sidebar && content) {
        sidebarToggleBtn.addEventListener('click', () => {
          sidebar.classList.toggle('show');
        });
      }

      if (sidebarCollapseBtn && sidebar) {
        sidebarCollapseBtn.addEventListener('click', () => {
          sidebar.classList.remove('show');
        });
      }
    }, 0);
  }

  logout() {
    this.authService.logout();
    console.log('Logged out successfully');
    this.router.navigate(['/login']); 
  }
}
