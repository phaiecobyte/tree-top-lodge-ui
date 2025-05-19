// src/app/core/utils/data-migration.ts
import { AccommodationService } from '../services/accommodation.service';
import { Accommodation } from '../../shared/models/accommodation.model';
import { from, concatMap } from 'rxjs';

export class DataMigrationUtil {
  static migrateAccommodations(accommodationService: AccommodationService, accommodations: Accommodation[]) {
    console.log(`Starting migration of ${accommodations.length} accommodations`);
    
    // Use concatMap to process one item at a time in sequence
    return from(accommodations).pipe(
      concatMap(accommodation => 
        accommodationService.addAccommodation(accommodation)
      )
    );
  }
}