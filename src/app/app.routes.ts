import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { NotFoundComponent } from './shared/components/not-found.component';
import { WebsiteLayoutComponent } from './layout/website-layout.component';
import { AccomodationComponent } from './features/website/accomodation/accomodation.component';
import { FoodBeverageComponent } from './features/website/food-beverage/food-beverage.component';
import { LoginComponent } from './features/website/login/login.component';


//admin components
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AccommodationComponent } from './features/admin/accommodation/accommodation.component';
import { AdminFoodBeverageComponent } from './features/admin/food-beverage/food-beverage.component';

export const routes: Routes = [
  {
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
      { path: 'accommodations', component: AdminFoodBeverageComponent },
      { path: 'bookings', component: NotFoundComponent },
      { path: 'food-beverage', component: FoodBeverageComponent },
      { path: 'users', component: NotFoundComponent },
      { path: 'settings', component: NotFoundComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'accommodation' },
  { path: '**', component: NotFoundComponent }
];
