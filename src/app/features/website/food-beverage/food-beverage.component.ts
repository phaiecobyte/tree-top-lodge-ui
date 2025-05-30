import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-food-beverage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './food-beverage.component.html',
  styleUrls: ['./food-beverage.component.scss']
})
export class FoodBeverageComponent{
  constructor(
    private http:HttpClient
  ){}

  

}

export interface Country{
  country:string;
  continent:string;
}