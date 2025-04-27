import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcherComponent } from "./components/theme-switcher/theme-switcher.component";
import { MasterLayoutComponent } from "./layout/master-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MasterLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tree-top-lodge-ui';
}
