import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Accommodation,
  AccommodationService,
} from '../../../core/services/accommodation.service';
import { DataTableComponent } from '../../../shared/components/data-display/data-table.component';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableComponent,
  ],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.scss',
})
export class AdminAccommodationComponent implements OnInit {
openAddModal() {
throw new Error('Method not implemented.');
}

  accommodationForm!: FormGroup;
  accommodations: Accommodation[] = [];
  loading = false;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  totalPages = 0;
  isEditing = false;
  selectedId: number | null = null;


  columns = [
    { header: 'Name', field: 'name', sortable: true },
    { header: 'Type', field: 'type', sortable: true },
    {
      header: 'Price',
      field: 'pricePerNight',
      sortable: true,
      formatter: (val: number) => `$${val}`,
    },
    { header: 'Max Guests', field: 'maxGuests', sortable: true },
  ];

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }


  loadAccommodations(): void {
    this.loading = true;
    this.accommodationService
      .getAllNormalized({
        page: this.currentPage,
        size: this.pageSize,
        sort: 'name,asc',
      })
      .subscribe({
        next: (response) => {
          // The response is now normalized, so you can always use response.content
          this.accommodations = response.content || [];
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
          this.loading = false;
          console.log('Accommodations loaded:', this.accommodations);
        },
        error: (error) => {
          console.error('Error loading accommodations', error);
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAccommodations();
  }


  
}
