export interface FoodBeverage {
    id?: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    additionalImages?: string[];
    rating: number;
    reviews?: number;
    category: string;
    available: boolean;
    createdAt?: Date; // For timestamps from Firebase
    updatedAt?: Date; // For timestamps from Firebase
}