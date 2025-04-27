import { Component } from "@angular/core";
import { ThemeSwitcherComponent } from "../components/theme-switcher/theme-switcher.component";

@Component({
    selector: "app-navbar",
    imports: [ThemeSwitcherComponent],
    template: `
        <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container">
                <a href="" class="navbar-brand d-none d-lg-inline-block">
                    <img class="logo" src="./logo-Treetop-lodge.png" alt="Tree Top Lodge Logo">
                </a>
                <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">  
                    <span class=" navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                        <li class="nav-item"><a class="nav-link" >Food & Beverage</a></li>  
                        <li class="nav-item"><a class="nav-link" href="#">Attraction</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Service</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Clients</a></li>                        
                        <li class="nav-item"><a class="nav-link" href="#">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Contact Us</a></li>
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
        .navbar-nav .nav-link:hover {
            border-bottom: 2px solid #fff;
            cursor:pointer;
        }
    `
    ],
})

export class NavbarComponent {
    constructor() {}
}
