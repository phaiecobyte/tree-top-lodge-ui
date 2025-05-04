import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accomodation',
  imports: [CommonModule],
  templateUrl: './accomodation.component.html',
  styleUrl: './accomodation.component.scss'
})
export class AccomodationComponent {
  accommodations: any[] = [
    {
      name: 'Tree Top Lodge',
      description: 'A luxurious lodge nestled in the treetops, offering stunning views and a unique experience.',
      imageUrl: 'assets/images/accommodation/tree-top-lodge.jpg',
      price: 200,
      location: 'Location 1'
    },
    {
      name: 'Forest Retreat',
      description: 'A serene retreat surrounded by nature, perfect for relaxation and rejuvenation.',
      imageUrl: 'assets/images/accommodation/forest-retreat.jpg',
      price: 150,
      location: 'Location 2'
    },
    {
      name: 'Mountain View Cabin',
      description: 'A cozy cabin with breathtaking mountain views, ideal for a romantic getaway.',
      imageUrl: 'assets/images/accommodation/mountain-view-cabin.jpg',
      price: 180,
      location: 'Location 3'
    }
    // Add more accommodation items as needed
  ];
}
