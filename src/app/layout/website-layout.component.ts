import { Component } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { FooterComponent } from "./footer.component";
import { RouterOutlet, RouterModule } from "@angular/router"; // Add RouterModule
import { CommonModule } from "@angular/common"; // Add CommonModule

@Component({
    selector: "app-website-layout",
    imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterModule, CommonModule],
    template:`
        <app-navbar></app-navbar>
        <div class="container">
            <router-outlet/>
        </div>
        <app-footer></app-footer>
    `
})
export class WebsiteLayoutComponent {}