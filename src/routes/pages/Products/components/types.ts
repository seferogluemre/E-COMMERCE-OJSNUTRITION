export const BASE_URL = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const PHOTO_URL = "https://fe1111.projects.academy.onlyjs.com";

export function getAllProducts(page: number, limit: number) {
  return (page - 1) * limit;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_explanation: string;
  explanation: Explanation;
  main_category_id: string;
  sub_category_id: string;
  tags: string[];
  variants: Variant[];
  comment_count: number;
  average_star: number;
}

interface Explanation {
  usage: string;
  features: string;
  description: string;
  important_note: string;
  nutritional_content: NutritionalContent;
}

interface NutritionalContent {
  ingredients: Ingredient[];
  nutrition_facts: NutritionFacts;
  amino_acid_facts: AminoAcidFact[];
}

interface Ingredient {
  aroma: string;
  value: string;
}

interface NutritionFacts {
  ingredients: NutritionFactIngredient[];
  portion_sizes: string[];
}

interface NutritionFactIngredient {
  name: string;
  amounts: string[];
}

interface AminoAcidFact {
  name: string;
  amount: string;
}

interface Variant {
  id: string;
  size: Size;
  aroma: string;
  price: Price;
  photo_src: string;
  is_available: boolean;
}

interface Size {
  gram: number;
  pieces: number;
  total_services: number;
}

interface Price {
  profit: number | null;
  total_price: number;
  discounted_price: number | null;
  price_per_servings: number;
  discount_percentage: number | null;
}
