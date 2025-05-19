import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WebsiteLayoutComponent } from "./layout/website-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tree-top-lodge-ui';
}
