import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'; // Added OnDestroy
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth, authState, User } from '@angular/fire/auth'; // Import authState and User
import { Subscription } from 'rxjs'; // Import Subscription
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Assuming standalone
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'tree-top-lodge-ui';

  constructor(@Inject(PLATFORM_ID) private plateFormId:Object){}

  
}
