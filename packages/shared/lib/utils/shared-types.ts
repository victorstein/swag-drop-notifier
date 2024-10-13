export type ValueOf<T> = T[keyof T];

export interface IProduct {
  title: string;
  new: boolean;
  id: number;
  variants: { title: string; price: string; id: number }[];
  images: { id: number; src: string; width: number; height: number }[];
  handle: string;
  createdAt: string;
}

export interface IRawProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: Variant[];
  images: Image[];
  options: Option[];
}

export interface Variant {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: string | null;
  available: boolean;
  price: string;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  created_at: string;
  position: number;
  updated_at: string;
  product_id: number;
  variant_ids: string[];
  src: string;
  width: number;
  height: number;
}

export interface Option {
  name: string;
  position: number;
  values: string[];
}
