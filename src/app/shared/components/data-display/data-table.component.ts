import { Component, EventEmitter, Input, Output, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn<T> {
  header: string;
  field: keyof T | string;
  sortable?: boolean;
  width?: string;
  template?: TemplateRef<any>;
  formatter?: (value: any, row: T) => string;
}

export interface SortEvent {
  field: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="table-responsive">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <!-- Search box -->
        <div class="input-group" style="max-width: 300px;" *ngIf="showSearch">
          <input 
            type="text"
            class="form-control"
            placeholder="Search..."
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
          >
          <button 
            class="btn btn-outline-secondary" 
            type="button"
            *ngIf="searchTerm"
            (click)="clearSearch()"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Custom actions -->
        <div>
          <ng-content select="[tableActions]"></ng-content>
        </div>
      </div>

      <!-- Loading overlay -->
      <div class="position-relative">
        <div *ngIf="loading" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" 
             style="background-color: rgba(255, 255, 255, 0.7); z-index: 1000;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <table class="table" [ngClass]="tableClass">
          <thead>
            <tr>
              <th *ngFor="let column of columns" [style.width]="column.width || 'auto'" scope="col">
                <div class="d-flex align-items-center">
                  {{ column.header }}
                  <button 
                    *ngIf="column.sortable" 
                    class="btn btn-sm ms-1 p-0" 
                    (click)="sort(column.field.toString())"
                  >
                    <i class="bi" [ngClass]="getSortIconClass(column.field.toString())"></i>
                  </button>
                </div>
              </th>
              <th *ngIf="showActions" style="width: 120px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fix: Check if data exists and has length > 0 -->
            <ng-container *ngIf="!loading && dataExists && data.length > 0">
              <tr *ngFor="let item of data">
                <td *ngFor="let column of columns">
                  <ng-container *ngIf="!column.template">
                    {{ getCellValue(item, column) }}
                  </ng-container>
                  <ng-container *ngIf="column.template">
                    <ng-container *ngTemplateOutlet="column.template; context: { $implicit: item, column: column }"></ng-container>
                  </ng-container>
                </td>
                <td *ngIf="showActions">
                  <div class="btn-group">
                    <button 
                      *ngIf="showEditAction" 
                      class="btn btn-sm btn-outline-primary" 
                      (click)="onEdit(item)"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button 
                      *ngIf="showDeleteAction" 
                      class="btn btn-sm btn-outline-danger" 
                      (click)="onDelete(item)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                    <ng-content select="[rowActions]"></ng-content>
                    <ng-container *ngIf="rowActionsTemplate">
                      <ng-container *ngTemplateOutlet="rowActionsTemplate; context: { $implicit: item }"></ng-container>
                    </ng-container>
                  </div>
                </td>
              </tr>
            </ng-container>
            <!-- Fix: Check if data exists -->
            <tr *ngIf="!loading && (!dataExists || data.length === 0)">
              <td [attr.colspan]="showActions ? columns.length + 1 : columns.length" class="text-center py-4">
                <ng-container *ngIf="emptyTemplate">
                  <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!emptyTemplate">
                  <div class="text-muted">
                    <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                    <p>{{ emptyMessage }}</p>
                  </div>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="showPagination && totalItems > 0" class="d-flex justify-content-between align-items-center mt-3">
        <div class="text-muted small">
          Showing {{ (currentPage * pageSize) + 1 }}-{{ Math.min((currentPage + 1) * pageSize, totalItems) }} of {{ totalItems }} items
        </div>
        <nav aria-label="Table pagination">
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" [class.disabled]="currentPage === 0">
              <a class="page-link" href="javascript:void(0)" (click)="changePage(currentPage - 1)">
                <i class="bi bi-chevron-left"></i>
              </a>
            </li>
            <ng-container *ngFor="let page of getPageRange()">
              <li class="page-item" [class.active]="page === currentPage">
                <a class="page-link" href="javascript:void(0)" (click)="changePage(page)">
                  {{ page + 1 }}
                </a>
              </li>
            </ng-container>
            <li class="page-item" [class.disabled]="currentPage >= totalPages - 1">
              <a class="page-link" href="javascript:void(0)" (click)="changePage(currentPage + 1)">
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `
})
export class DataTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() loading = false;
  @Input() tableClass = 'table-hover';
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() showActions = true;
  @Input() showEditAction = true;
  @Input() showDeleteAction = true;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() emptyMessage = 'No items found';
  @Input() emptyTemplate?: TemplateRef<any>;
  @Input() rowActionsTemplate?: TemplateRef<any>;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';
  sortField?: string;
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Helper property to safely check if data exists
  get dataExists(): boolean {
    return Array.isArray(this.data);
  }
  
  protected Math = Math;

  ngOnInit(): void {
    // Initialize with an empty array if data is undefined
    if (!this.dataExists) {
      this.data = [];
    }
  }
  
  getCellValue(item: T, column: TableColumn<T>): string {
    if (!item) return '';
    
    const fieldPath = column.field.toString().split('.');
    let value = item as any;
    
    for (const key of fieldPath) {
      if (value === null || value === undefined) return '';
      value = value[key];
    }
    
    if (column.formatter) {
      return column.formatter(value, item);
    }
    
    return value !== null && value !== undefined ? value.toString() : '';
  }

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.pageChange.emit(page);
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({ field, direction: this.sortDirection });
  }

  getSortIconClass(field: string): string {
    if (field !== this.sortField) return 'bi-arrow-down-up';
    return this.sortDirection === 'asc' ? 'bi-sort-down' : 'bi-sort-up';
  }

  onSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  getPageRange(): number[] {
    const maxPages = 5;
    const totalPages = this.totalPages || 1; // Ensure at least 1 page
    
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPages / 2));
    let endPage = startPage + maxPages - 1;
    
    if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = Math.max(0, endPage - maxPages + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}