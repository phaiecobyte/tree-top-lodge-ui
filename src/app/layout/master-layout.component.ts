import { Component } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { FooterComponent } from "./footer.component";

@Component({
    selector: "app-master-layout",
    imports: [NavbarComponent, FooterComponent],
    template:`
        <app-navbar></app-navbar>
        <app-footer></app-footer>
    `,
    styles:[],
})

export class MasterLayoutComponent {
    constructor() {}
}