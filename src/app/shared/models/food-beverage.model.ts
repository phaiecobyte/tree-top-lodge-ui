export interface FoodBeverage {
    id?: string;  // Using string for Firebase IDs
    name: string;
    description: string;
    price: number;
    imageUrl: string[]; // Array of image URLs
    rating: number;
    reviews?: number;
    category: string;
    available: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}