export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_creator: boolean
          bio: string | null
          follower_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_creator?: boolean
          bio?: string | null
          follower_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_creator?: boolean
          bio?: string | null
          follower_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      auctions: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string
          category_id: string | null
          auction_type: 'object' | 'experience'
          starting_bid: number
          current_bid: number
          buy_now_price: number | null
          bid_count: number
          watcher_count: number
          status: 'draft' | 'live' | 'ended' | 'cancelled' | 'sold'
          start_time: string
          end_time: string
          featured_image: string | null
          images: Json
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description: string
          category_id?: string | null
          auction_type: 'object' | 'experience'
          starting_bid?: number
          current_bid?: number
          buy_now_price?: number | null
          bid_count?: number
          watcher_count?: number
          status?: 'draft' | 'live' | 'ended' | 'cancelled' | 'sold'
          start_time?: string
          end_time: string
          featured_image?: string | null
          images?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string
          category_id?: string | null
          auction_type?: 'object' | 'experience'
          starting_bid?: number
          current_bid?: number
          buy_now_price?: number | null
          bid_count?: number
          watcher_count?: number
          status?: 'draft' | 'live' | 'ended' | 'cancelled' | 'sold'
          start_time?: string
          end_time?: string
          featured_image?: string | null
          images?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          auction_id: string
          bidder_id: string
          amount: number
          is_auto_bid: boolean
          created_at: string
        }
        Insert: {
          id?: string
          auction_id: string
          bidder_id: string
          amount: number
          is_auto_bid?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          auction_id?: string
          bidder_id?: string
          amount?: number
          is_auto_bid?: boolean
          created_at?: string
        }
      }
      watchlist: {
        Row: {
          id: string
          user_id: string
          auction_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          auction_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          auction_id?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          auction_id: string
          buyer_id: string
          seller_id: string
          amount: number
          payment_method: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auction_id: string
          buyer_id: string
          seller_id: string
          amount: number
          payment_method: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auction_id?: string
          buyer_id?: string
          seller_id?: string
          amount?: number
          payment_method?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          query: string
          filters: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          query: string
          filters?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          query?: string
          filters?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
