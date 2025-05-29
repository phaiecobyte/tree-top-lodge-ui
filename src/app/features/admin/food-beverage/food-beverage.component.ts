import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FoodBeverage } from '../../../core/models/food-beverage.model';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FoodBeverageService } from '../../../core/services/foodbeverage.service';

// For Bootstrap modals
declare var bootstrap: any;

@Component({
  selector: 'app-food-beverage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './food-beverage.component.html',
  styleUrls: ['./food-beverage.component.scss']
})
export class AdminFoodBeverageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  

}
