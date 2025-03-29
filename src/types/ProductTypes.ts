// export interface Ingredient {
//     aroma: string;
//     value: string;
// }
// export interface ProductInfoAccordionProps {
//     features: string;
//     usage: string;
//     nutritionalContent: NutritionalContent;
//     gramSize: number;
//     totalServices: number;
// }
// export interface NutritionFactIngredient {
//     name: string;
//     amounts: string[];
// }

// export interface NutritionFacts {
//     ingredients: NutritionFactIngredient[];
//     portion_sizes: string[];
// }

// export interface AminoAcidFact {
//     name: string;
//     amount: string;
// }

// export interface NutritionalContent {
//     ingredients: Ingredient[];
//     nutrition_facts: NutritionFacts;
//     amino_acid_facts?: AminoAcidFact[];
// }

// export interface PriceInfo {
//     profit?: number | null;
//     total_price: number;
//     discounted_price?: number | null;
//     price_per_servings?: number;
//     discount_percentage?: number | null;
// }

// export interface Size {
//     gram: number;
//     pieces: number;
//     total_services: number;
// }

// export interface Variant {
//     id: string;
//     size: Size;
//     aroma: string;
//     price: PriceInfo;
//     photo_src: string;
//     is_available: boolean;
// }

// export interface Explanation {
//     usage: string;
//     features: string;
//     description: string;
//     important_note?: string;
//     nutritional_content: NutritionalContent;
// }

// export interface Product {
//     id: string;
//     name: string;
//     slug: string;
//     short_explanation: string;
//     explanation: Explanation;
//     main_category_id: string;
//     sub_category_id: string;
//     tags: string[];
//     variants: Variant[];
//     comment_count: number;
//     average_star: number;
//     price_info?: PriceInfo;
// }
// export interface ProductImageProps {
//     src: string;
//     width?: string;
//     height?: string;
//     magnifierHeight?: number;
//     magnifierWidth?: number;
//     zoomLevel?: number;
//     className: string;
// }

// export interface ProductListProp {
//     id: string;
//     name: string;
//     photo_src: string;
//     price_info: PriceInfo;
//     short_explanation: string;
//     slug: string;
//     average_star: number;
//     comment_count: number;
// }

// export interface BestSellerProps extends ProductListProp {
//     discounted_percentage?: number;
// }

// export interface LastViewProduct extends ProductListProp { }

// export interface SearchState {
//     products: ProductListProp[];
//     setProducts: (products: ProductListProp[]) => void;
//     searchProducts: (query: string) => Promise<void>;
// }

// export function getAllProducts(page: number, limit: number) {
//     return (page - 1) * limit;
// }

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
    discounted_percentage?: number | null;
    comment_count?: number;
    average_star: number;
}

export interface LastViewProduct {
    name: string;
    photo_src: string;
    slug: string;
    comment_count: number;
    price_info: {
        total_price: number
    };
}

export interface CategoryProp {
    CategoriesPhoto: string;
    to: string;
}

export interface NutritionalContent {
    ingredients: { aroma: string; value: string[] }[];
    nutrition_facts: {
        ingredients: { name: string; amounts: string[] }[];
        portion_sizes: string[];
    };
    amino_acid_facts?: {
        ingredients: { name: string; amounts: string[] }[];
        portion_sizes: string[];
    };
}

export interface Variant {
    id: string;
    size: {
        gram: number;
        pieces: number;
        total_services: number;
    };
    aroma: string;
    price: {
        profit: number;
        total_price: number;
        discounted_price: number;
        price_per_servings: number;
        discount_percentage: number;
    };
    photo_src: string;
    is_available: boolean;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    short_explanation: string;
    explanation: {
        usage: string;
        features: string;
        description: string;
        nutritional_content: NutritionalContent;
    };
    main_category_id: string;
    sub_category_id: string;
    tags: string[];
    variants: Variant[];
    comment_count: number;
    average_star: number;
    price?: number;
    commentCount?: number;
    photo_src?: string;
}

export interface ColorProps {
    [key: string]: string;
}

export interface ProductHeaderProps {
    name: string;
    slug: string;
    commentCount: number;
    tags: string[];
}

export interface ProductImageProps {
    src: string;
    width?: string;
    height?: string;
    magnifierHeight?: number;
    magnifierWidth?: number;
    zoomLevel?: number;
    className: string;
}

export interface ProductInfoAccordionProps {
    features: string;
    usage: string;
    nutritionalContent: NutritionalContent;
    gramSize: number;
    totalServices: number;
}

export interface ProductPriceSectionProps {
    matchingTotalPrice: number;
    originalPrice: number;
    discountPercentage: number;
    totalServices: number;
    count: number;
    handleCountChange: (increment: boolean) => void;
    handleAddToCart: () => void;
}

export interface ProductVariantSelectorProps {
    variants: Variant[];
    selectedAroma: number | undefined;
    setSelectedAroma: (index: number) => void;
    selectedSize: number | undefined;
    setSelectedSize: (index: number) => void;
    updatePhotoBasedOnSelection: (aromaIndex: number | undefined, sizeIndex: number | undefined) => void;
    aromaColors: ColorProps;
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
export interface PriceInfo {
    profit?: null;
    total_price: number;
    discounted_price?: number | null;
    price_per_servings?: number;
    discount_percentage?: number | null;
}

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

export interface Explanation {
    usage: string;
    features: string;
    description: string;
    important_note: string;
    nutritional_content: NutritionalContent;
}

export interface NutritionalContent {
    ingredients: Ingredient[];
    nutrition_facts: NutritionFacts;
    amino_acid_facts: AminoAcidFact[];
}
export interface SearchState {
    products: ProductListProp[];
    setProducts: (products: ProductListProp[]) => void;
    searchProducts: (query: string) => Promise<void>;
}
export interface Ingredient {
    aroma: string;
    value: string;
}

export interface NutritionFacts {
    ingredients: NutritionFactIngredient[];
    portion_sizes: string[];
}

export interface NutritionFactIngredient {
    name: string;
    amounts: string[];
}

export interface AminoAcidFact {
    name: string;
    amount: string;
}

export interface Variant {
    id: string;
    size: Size;
    aroma: string;
    price: Price;
    photo_src: string;
    is_available: boolean;
}

export interface Size {
    gram: number;
    pieces: number;
    total_services: number;
}

export interface Price {
    profit: number | null;
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number;
    discount_percentage: number | null;
}