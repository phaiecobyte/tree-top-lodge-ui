import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodBeverageService } from '../../../core/services/foodbeverage.service';
import { CategoryService } from '../../../core/services/category.service';
import { FoodBeverage } from '../../../core/models/food-beverage.model';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-food-beverage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './food-beverage.component.html',
  styleUrls: ['./food-beverage.component.scss']
})
export class FoodBeverageComponent implements OnInit, OnDestroy {
  // Items data
  foodItems: FoodBeverage[] = [];

  //static categories
  categories: Category[]=[];
    
  
  // Filter and search
  selectedCategory: string | null = null;
  searchQuery: string = '';
  
  // UI state
  isLoading: boolean = true;
  errorMessage: string | null = null;
  
  // Subscription management
  private subscriptions: Subscription[] = [];
  
  constructor(
    private foodBeverageService: FoodBeverageService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  
  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  


  
  search(query: string): void {
    this.searchQuery = query.toLowerCase();
  }
  
  get filteredItems(): FoodBeverage[] {
    if (!this.searchQuery) {
      return this.foodItems;
    }
    
    return this.foodItems.filter(item => 
      item.name.toLowerCase().includes(this.searchQuery) ||
      item.description.toLowerCase().includes(this.searchQuery) ||
      item.category.toLowerCase().includes(this.searchQuery)
    );
  }
  
  viewItemDetails(item: FoodBeverage): void {
    this.router.navigate(['/food-beverage/details', item.id]);
  }
}