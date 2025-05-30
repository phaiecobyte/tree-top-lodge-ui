import { Component, OnInit, OnDestroy } from '@angular/core'; // Added OnDestroy
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth, authState, User } from '@angular/fire/auth'; // Import authState and User
import { Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-root',
  standalone: true, // Assuming standalone
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { // Implement OnDestroy
  title = 'tree-top-lodge-ui';
 
}
