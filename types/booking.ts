export interface Booking {
  id: string;
  user_id: string;
  booking_type: 'hotel' | 'tour';
  hotel_id?: string;
  tour_id?: string;
  check_in_date: string;
  check_out_date?: string;
  guests_count: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  payment_method?: string;
  payment_transaction_id?: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  full_name: string;
  email: string;
  phone: string;
  special_requests?: string;
  payment_method: 'stripe' | 'paypal' | 'paymob';
}

export interface BookingDetails extends Booking {
  hotel?: {
    name_ar: string;
    name_en: string;
    city: string;
  };
  tour?: {
    name_ar: string;
    name_en: string;
    destination: string;
  };
  user?: {
    full_name: string;
    email: string;
    phone: string;
  };
}
