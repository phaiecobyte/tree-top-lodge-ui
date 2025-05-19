import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Add RouterModule import
import { SearchComponent } from '../../../shared/components/search.component';

@Component({
  selector: 'app-food-beverage',
  imports: [CommonModule, SearchComponent, RouterModule], // Add RouterModule to imports
  templateUrl: './food-beverage.component.html',
  styleUrl: './food-beverage.component.scss'
})
export class FoodBeverageComponent {

  food:any[]=[
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
    {
      image: "./images/food-beverage/turkey-300x200.jpg",
      name:"turkey",
      description:"lorem loreme lorem loremd loredmdoleolsdfowiower",
      price:"5$"
    },
]
  constructor(){}

}
