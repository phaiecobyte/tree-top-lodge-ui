export interface Accommodation {
  id?: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  beds: string;
  bathrooms: string;
  features: string[];
}

export interface BookingRequest {
  accommodationId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  specialRequests?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}