import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/ui/not-found.component';

//public features
import { WebsiteLayoutComponent } from './layout/website-layout.component';
import { AccomodationComponent } from './features/website/accomodation/accomodation.component';
import { FoodBeverageComponent } from './features/website/food-beverage/food-beverage.component';
import { LoginComponent } from './features/website/login/login.component';


//admin features
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AuthGuard } from './core/authentication/auth.guard';
import { PlaceholderComponent } from './shared/components/ui/placeholder.component';

export const routes: Routes = [
  {
    //public routes
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      {path: 'accommodation', component: AccomodationComponent},
      {path: 'food-beverage', component: FoodBeverageComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: NotFoundComponent },
      { path: 'accommodations', component: PlaceholderComponent },
      { path: 'category', component: PlaceholderComponent },
      { path: 'food-beverage', component: PlaceholderComponent },
      { path: 'users', component: NotFoundComponent },
      { path: 'settings', component: PlaceholderComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'accommodation' },
  { path: '**', component: PlaceholderComponent }
];
