export enum Category {
  ECONOMY = 'ECONOMY',
  LUXURY = 'LUXURY',
  BUSINESS = 'BUSINESS',
}

export enum ServiceType {
  HOTEL = 'HOTEL',
  FLIGHT = 'FLIGHT',
  CAR = 'CAR',
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  serviceType: ServiceType;
  category: Category;
  location: string;
  imageUrl: string;
  maxPersons: number;
  price: number;
  currency: string;
}
