import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

interface NutritionalContent {
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

interface Variant {
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

interface Product {
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
}

function ProductDetail() {
  // const { productSlug } = useParams();
  // // const { loading, error, data }: { data: Product | null } = useFetch(
  // //   String(productSlug)
  // // );

  const { product } = useLoaderData() as Product[];

  return (
    <Container className="my-5">
      <Row></Row>
    </Container>
  );
}

export default ProductDetail;
