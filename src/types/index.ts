export interface Garment {
  id: string;
  name: string;
  description: string;
  category: 'SAREE' | 'LEHENGA' | 'KURTA' | 'SALWAR_KAMEEZ';
  region: 'SOUTH_INDIAN' | 'NORTH_INDIAN' | 'PUNJABI' | 'BENGALI';
  imageUrl: string;
  thumbnailUrl: string;
  colors: string[];
  occasions: string[];
  fabricType: string;
  price: number;
  discountPrice?: number;
  availableSizes: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  garmentId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface TryOnSession {
  id: string;
  garmentId: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  inputImageUrl: string;
  resultImageUrl?: string;
  qualityScore?: number;
  createdAt: Date;
}
