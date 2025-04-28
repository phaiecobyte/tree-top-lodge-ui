import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SearchComponent } from "../shared/search.component";

@Component({
  selector: 'app-food-beverage',
  imports: [CommonModule,SearchComponent],
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
