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
        <form>
            <div class="form-group mb-3 d-flex">
                <input type="text" class="form-control me-1" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
                <button class="btn btn-outline-primary" type="submit">Search</button>
            </div>
        </form>
        </div>
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