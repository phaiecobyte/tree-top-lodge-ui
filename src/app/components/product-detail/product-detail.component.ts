import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h4>Product Detail</h4>
  <div class="row">
    <!-- Product Images -->
    <div class="col-md-6">
      <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div *ngFor="let image of product.images; let i = index" class="carousel-item" [class.active]="i === 0">
            <img [src]="image" class="d-block w-100" alt="Product Image">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div class="col-md-6">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p><strong>Price:</strong> {{ product.price }}</p>
      <a class="btn btn-primary" href="/food-beverage"> <span><i class="bi bi-arrow-left-square"></i></span> Back</a>
    </div>
  </div>

  <!-- Reviews Section -->
  <div class="row mt-5">
    <div class="col-12">
      <h4>Customer Reviews</h4>
      <div *ngFor="let review of product.reviews" class="mb-3">
        <strong>{{ review.user }}</strong>
        <p>{{ review.comment }}</p>
        <p>Rating: {{ review.rating }} / 5</p>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product = {
    name: 'Deluxe Turkey Meal',
    description: 'A delicious turkey meal served with fresh vegetables and a side of mashed potatoes.',
    price: '15$',
    images: [
      './images/food-beverage/turkey-585x390.jpg',
      './images/food-beverage/turkey-585x390.jpg',
      './images/food-beverage/turkey-585x390.jpg',
    ],
    reviews: [
      { user: 'Kit Sophal', comment: 'Amazing taste!', rating: 5 },
      { user: 'Sophai', comment: 'Loved it!', rating: 4 },
    ],
  };

  constructor(private router:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
