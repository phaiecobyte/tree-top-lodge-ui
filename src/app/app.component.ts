import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MasterLayoutComponent } from "./layout/master-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MasterLayoutComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tree-top-lodge-ui';
}
