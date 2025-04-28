import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-beverage',
  imports: [],
  templateUrl: './food-beverage.component.html',
  styleUrl: './food-beverage.component.scss'
})
export class FoodBeverageComponent implements OnInit{

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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
