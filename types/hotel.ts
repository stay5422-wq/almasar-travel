export interface Hotel {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  address?: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  images: string[];
  rooms_available: number;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface HotelFilters {
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  featured?: boolean;
}

export interface HotelSearchParams {
  query?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  filters?: HotelFilters;
  page?: number;
  limit?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating_desc' | 'name';
}
