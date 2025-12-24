export interface Tour {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  slug: string;
  destination: string;
  duration: number; // in days
  price: number;
  max_participants?: number;
  includes: string[];
  excludes: string[];
  itinerary: DayItinerary[];
  images: string[];
  available_dates: string[];
  difficulty_level: 'easy' | 'moderate' | 'challenging';
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface DayItinerary {
  day: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  activities: string[];
}

export interface TourFilters {
  destination?: string;
  minDuration?: number;
  maxDuration?: number;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  featured?: boolean;
}

export interface TourSearchParams {
  query?: string;
  date?: string;
  participants?: number;
  filters?: TourFilters;
  page?: number;
  limit?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'duration_asc' | 'duration_desc' | 'name';
}
