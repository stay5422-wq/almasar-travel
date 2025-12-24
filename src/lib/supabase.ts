import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (with service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Database Types
export interface Client {
  id: string;
  name: string;
  type: 'hotel' | 'tourism_company' | 'corporate';
  city: string;
  contact_email?: string;
  contact_phone?: string;
  status: 'active' | 'paused' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  client_id: string;
  name: string;
  platform: 'facebook' | 'google' | 'instagram' | 'linkedin';
  budget: number;
  spent: number;
  start_date: string;
  end_date?: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  impressions: number;
  clicks: number;
  conversions: number;
  created_at: string;
  updated_at: string;
}

export interface ContentPost {
  id: string;
  client_id: string;
  title: string;
  content?: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  type: 'text' | 'image' | 'video' | 'carousel';
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_for?: string;
  published_at?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  created_at: string;
  updated_at: string;
}

export interface SEOKeyword {
  id: string;
  client_id: string;
  keyword: string;
  position?: number;
  search_volume?: number;
  difficulty?: number;
  traffic: number;
  trend: 'up' | 'down' | 'same';
  created_at: string;
  updated_at: string;
}

// Helper functions
export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Client[];
}

export async function getCampaigns(clientId?: string) {
  let query = supabase
    .from('campaigns')
    .select('*, clients(name, type)');
  
  if (clientId) {
    query = query.eq('client_id', clientId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getContentPosts(clientId?: string) {
  let query = supabase
    .from('content_posts')
    .select('*, clients(name, type)');
  
  if (clientId) {
    query = query.eq('client_id', clientId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getSEOKeywords(clientId?: string) {
  let query = supabase
    .from('seo_keywords')
    .select('*, clients(name, type)');
  
  if (clientId) {
    query = query.eq('client_id', clientId);
  }
  
  const { data, error } = await query.order('position', { ascending: true });
  
  if (error) throw error;
  return data;
}
