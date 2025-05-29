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
export class AppComponent implements OnInit, OnDestroy { // Implement OnDestroy
  title = 'tree-top-lodge-ui';
  private authSubscription: Subscription | undefined;

  constructor(private afAuth: Auth) {} // Inject AngularFire Auth

  ngOnInit() {
    // Use AngularFire's authState observable
    this.authSubscription = authState(this.afAuth).subscribe((user: User | null) => {
      if (user) {
        console.log('AppComponent: User is signed in', user.uid);
      } else {
        console.log('AppComponent: User is signed out');
      }
      // Perform actions based on auth state, Angular's change detection will be aware
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
