import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WebsiteLayoutComponent } from "./layout/website-layout.component";
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tree-top-lodge-ui';

  constructor(private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    });
  }
}
