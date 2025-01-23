export interface PriceInfo {
  profit?: null;
  total_price: number;
  discounted_price?: number | null;
  price_per_servings?: number;
  discount_percentage?: number | null;
}

export interface BestSellerPropsCS {
  name: string;
  short_explanation: string;
  price_info: PriceInfo;
  photo_src: string;
  comment_count?: number;
  average_star: number;
  discounted_percentage: number | null;
  slug?: string;
}

export interface BestSellerProps {
  name: string;
  short_explanation: string;
  slug?: string;
  price_info: PriceInfo;
  photo_src: string;
  discounted_percentage: number | null;
  comment_count?: number;
  average_star: number;
}

export interface ProductListProp {
  average_star: number;
  comment_count: number;
  id: number;
  name: string;
  photo_src: string;
  price_info: PriceInfo;
  short_explanation: string;
  slug: string;
}


