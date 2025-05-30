import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { AuthService } from '../authentication/auth.service';

export interface FoodBeverage {
  id?: number;
  code: string;
  name: string;
  description: string;
  price: number;
  mainImgUrl: string;
  additionalImageUrls: string[];
  category: string;
  rating: number;
  review: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodBeverageService extends BaseApiService<FoodBeverage> {
  constructor(http: HttpClient, authService:AuthService) {
    super('food-beverages', http, authService);
  }
}