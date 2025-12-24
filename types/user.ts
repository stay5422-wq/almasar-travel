export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'manager';
  created_at: string;
  updated_at: string;
}

export interface Profile extends User {
  bookings_count?: number;
  total_spent?: number;
}
