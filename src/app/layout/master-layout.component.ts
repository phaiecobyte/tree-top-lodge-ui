import { Component } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { FooterComponent } from "./footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-master-layout",
    imports: [NavbarComponent, FooterComponent,RouterOutlet],
    template:`
        <app-navbar></app-navbar>
        <div class="container">
            <router-outlet/>
        </div>
        <app-footer></app-footer>
    `,
    styles:[],
})

export class MasterLayoutComponent {
    constructor() {}
}