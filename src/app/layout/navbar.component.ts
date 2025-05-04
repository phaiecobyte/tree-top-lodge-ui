import { Component } from "@angular/core";
import { ThemeSwitcherComponent } from "../components/theme-switcher/theme-switcher.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-navbar",
    imports: [ThemeSwitcherComponent, RouterModule],
    template: `
        <nav class="navbar navbar-expand-lg bg-primary shadow-sm">
            <div class="container">
                <a routerLink="/" class="navbar-brand d-none d-lg-inline-block">
                    <img class="logo" src="./logo-Treetop-lodge.png" alt="Tree Top Lodge Logo">
                </a>
                <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">  
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/accommodation" routerLinkActive="active">Accommodation</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/food-beverage" routerLinkActive="active">Food & Beverage</a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/attraction" routerLinkActive="active">Attraction</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/service" routerLinkActive="active">Service</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/clients" routerLinkActive="active">Clients</a>
                        </li>                        
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/about" routerLinkActive="active">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact Us</a>
                        </li>
                    </ul>      
                </div>
                <app-theme-switcher></app-theme-switcher>              
            </div>
        </nav>`,
    styles: [
        `
        nav {
            margin-bottom: 20px;
        }
        .logo {
            width: 100px;
            height: auto;
            margin-right: 20px;
        }
        .navbar-nav .nav-link {
            color: #fff !important;
        }
        .navbar-nav .nav-link:hover, 
        .navbar-nav .nav-link.active {
            border-bottom: 2px solid #fff;
            cursor: pointer;
        }
        .active {
            font-weight: bold;
        }
        `
    ],
})

export class NavbarComponent {
    constructor() {}
}
