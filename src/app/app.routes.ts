import { Routes } from '@angular/router';
import { FoodBeverageComponent } from './components/food-beverage/food-beverage.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';

export const routes: Routes = [
    {path:'accommodation',component:AccomodationComponent},
    {path:'food-beverage',component:FoodBeverageComponent},
    {path:'product-detail',component:ProductDetailComponent},
    {path:'',pathMatch:'full',redirectTo:'accommodation'}
];
