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
      shops: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          address: string | null
          city: string | null
          country: string | null
          owner_id: string
          subscription_plan: string
          subscription_status: string
          subscription_expires_at: string | null
          currency: string
          timezone: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          owner_id: string
          subscription_plan?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          currency?: string
          timezone?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          owner_id?: string
          subscription_plan?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          currency?: string
          timezone?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          shop_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          shop_id: string
          category_id: string | null
          name: string
          description: string | null
          sku: string | null
          barcode: string | null
          price: number
          cost_price: number
          tax_rate: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          category_id?: string | null
          name: string
          description?: string | null
          sku?: string | null
          barcode?: string | null
          price: number
          cost_price: number
          tax_rate?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          sku?: string | null
          barcode?: string | null
          price?: number
          cost_price?: number
          tax_rate?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}