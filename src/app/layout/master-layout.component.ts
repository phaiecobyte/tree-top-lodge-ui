import { Component } from "@angular/core";
import { NavbarComponent } from "./navbar.component";

@Component({
    selector: "app-master-layout",
    imports:[NavbarComponent],
    template:`
        <app-navbar></app-navbar>
    `,
    styles:[],
})

export class MasterLayoutComponent {
    constructor() {}
}