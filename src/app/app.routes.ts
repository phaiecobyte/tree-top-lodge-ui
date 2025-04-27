import { Routes } from '@angular/router';
import { FoodBeverageComponent } from './components/food-beverage/food-beverage.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'food-beverage'},
    {path:'food-beverage',component:FoodBeverageComponent}
];
