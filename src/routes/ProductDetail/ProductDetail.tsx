import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "./_ProductDetail.scss";
import ProductComment from "./components/ProductComment/ProductComment";
import ProductTrust from "./components/ProductTrust/ProductTrust";
import BestSeller from "../../components/BestSeller/BestSeller";
import UseLocalStorage from "../../hooks/UseSessionStorage";
import LastView from "./components/LastView/LastView";
import { ProductImage } from "./components/ProductImage";
import { useCartStore, CartItem } from "../../store/products/Cart";
import { useToastStore } from "../../store/toast/ToastStore";
import { PHOTO_URL } from "../../services/api/collections/Auth";
import ProductVariantSelector from "./components/ProductVariantSelector";
import ProductInfoAccordion from "./components/ProductInfoAccordion";
import ProductPriceSection from "./components/ProductPriceSection";
import ProductHeader from "./components/ProductHeader";

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

interface ColorProps {
  [key: string]: string;
}

export const LOCAL_KEY = "lastView";

function ProductDetail() {
  const { product, bestSeller } = useLoaderData() as {
    product: Product;
    bestSeller: Product[];
  };
  const [count, setCount] = useState<number>(0);
  const [, setStoredValue] = UseLocalStorage(LOCAL_KEY, "");
  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedAroma, setSelectedAroma] = useState<number>();
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [matchingTotalPrice, setMatchingTotalPrice] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { addToCart } = useCartStore();
  const toast = useToastStore();
  const [productState, setProductState] = useState<Product[]>(
    Array.isArray(product) ? product : [product]
  );

  const aromaColors: ColorProps = {
    Bisküvi: "/assets/icons/bisküvi.webp",
    Çikolata: "/assets/icons/çikolata.webp",
    Muz: "/assets/icons/muz.webp",
    "Salted Caramel": "/assets/icons/karamel.webp",
    "Choco Nut": "/assets/icons/çokonat.webp",
    "Hindistan Cevizi": "#FFEBCD",
    "Raspberry Cheesecake": "/assets/icons/rasperryChescake.webp",
    Çilek: "/assets/icons/çilek.webp",
    Aromasız: "/assets/icons/aromasız.webp",
    Karpuz: "/assets/icons/karpuz.webp",
    Limonata: "/assets/icons/limonata.webp",
    "Fruit Fusion": "/assets/icons/fruitfusion.webp",
    "Yeşil Elma": "/assets/icons/yesilelma.webp",
    "Lemon Cheesecake": "/assets/icons/lemonCheescake.webp",
    Muhallebi: "/assets/icons/muhallebi.webp",
    Ahududu: "/assets/icons/ahududu.webp",
    Şeftali: "/assets/icons/seftali.webp",
  };

  const updatePhotoBasedOnSelection = (
    selectedAromaIndex: number | undefined,
    selectedSizeIndex: number | undefined
  ) => {
    if (selectedAromaIndex === undefined || selectedSizeIndex === undefined)
      return;

    const selectedAromaName = Array.from(
      new Set(product.variants.map((variant: Variant) => variant.aroma))
    )[selectedAromaIndex];

    interface SizeInfo {
      gram: number;
      totalServices: number;
    }

    const selectedSizeInfo = [
      ...new Map(
        product.variants.map((item: Variant) => [
          `${item.size.gram}-${item.size.total_services}`,
          {
            gram: item.size.gram,
            totalServices: item.size.total_services,
          } as SizeInfo,
        ])
      ).values(),
    ][selectedSizeIndex] as SizeInfo;

    const matchingVariant = product.variants.find(
      (variant: Variant) =>
        variant.aroma === selectedAromaName &&
        variant.size.gram === selectedSizeInfo.gram &&
        variant.size.total_services === selectedSizeInfo.totalServices
    );

    if (matchingVariant) {
      setPhotoSrc(matchingVariant.photo_src);
      setTotalServices(matchingVariant.size.total_services);
      setOriginalPrice(matchingVariant.price.total_price);
      setDiscountPercentage(matchingVariant.price.discount_percentage || 0);

      const discountedPrice = matchingVariant.price.discount_percentage
        ? matchingVariant.price.total_price *
        (1 - matchingVariant.price.discount_percentage / 100)
        : matchingVariant.price.total_price;

      setMatchingTotalPrice(Math.round(discountedPrice));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setProductState(Array.isArray(product) ? product : [product]);

    // İlk variant'ın değerlerini set et
    if (product.variants && product.variants.length > 0) {
      const initialVariant = product.variants[0];
      setPhotoSrc(initialVariant.photo_src);
      setTotalServices(initialVariant.size.total_services);
      setOriginalPrice(initialVariant.price.total_price);
      setDiscountPercentage(initialVariant.price.discount_percentage || 0);

      // İndirimli fiyatı hesapla
      const discountedPrice = initialVariant.price.discount_percentage
        ? initialVariant.price.total_price *
        (1 - initialVariant.price.discount_percentage / 100)
        : initialVariant.price.total_price;

      setMatchingTotalPrice(Math.round(discountedPrice));
    }

    setSelectedAroma(0);
    setSelectedSize(0);

    const productData = {
      price: product.variants[0].price.total_price,
      commentCount: product.comment_count,
      name: product.name,
      slug: product.slug,
      photo: PHOTO_URL + product.variants[0].photo_src,
    };

    setStoredValue((prevValue: Product[]) => {
      const updatedValue = Array.isArray(prevValue) ? prevValue : [];
      const existingProductIndex = updatedValue.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        updatedValue.splice(existingProductIndex, 1);
      }
      updatedValue.unshift({
        id: product.id,
        name: product.name,
        slug: product.slug,
        short_explanation: product.short_explanation,
        explanation: product.explanation,
        main_category_id: product.main_category_id,
        sub_category_id: product.sub_category_id,
        tags: product.tags,
        variants: product.variants,
        comment_count: product.comment_count,
        average_star: product.average_star,
        price: productData.price,
        commentCount: productData.commentCount,
        photo_src: productData.photo,
      });
      // Ürün aromaları varsa state'i
      if (product.variants && product.variants.length > 0) {
        setPhotoSrc(product.variants[0].photo_src);
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedValue));

      return updatedValue;
    });
  }, [product]);

  const handleCountChange = (increment: boolean) => {
    if (increment) {
      setCount(count + 1);
    } else if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (
      count > 0 &&
      selectedAroma !== undefined &&
      selectedSize !== undefined
    ) {
      const selectedAromaName = Array.from(
        new Set(product.variants.map((variant: Variant) => variant.aroma))
      )[selectedAroma];

      interface SizeInfo {
        gram: number;
        totalServices: number;
      }

      const selectedSizeInfo = [
        ...new Map(
          product.variants.map((item: Variant) => [
            `${item.size.gram}-${item.size.total_services}`,
            {
              gram: item.size.gram,
              totalServices: item.size.total_services,
            } as SizeInfo,
          ])
        ).values(),
      ][selectedSize] as SizeInfo;

      const selectedVariant = product.variants.find(
        (variant: Variant) =>
          variant.aroma === selectedAromaName &&
          variant.size.gram === selectedSizeInfo.gram &&
          variant.size.total_services === selectedSizeInfo.totalServices
      );

      if (!selectedVariant) {
        toast.showToast("Ürün seçimi yapılamadı");
        return;
      }

      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        variant_name: `${selectedSizeInfo.gram}g ${selectedAromaName}`,
        product_variant_id: selectedVariant.id,
        aroma: selectedAromaName,
        size: {
          gram: selectedSizeInfo.gram,
          total_services: selectedSizeInfo.totalServices,
        },
        price: matchingTotalPrice,
        pieces: count,
        photo_src: selectedVariant.photo_src,
      };
      console.log("Seçilen varyant numarası:", selectedVariant.id);
      addToCart(cartItem);
      setCount(0);
      toast.showToast("Ürün sepete eklendi");
    }
  };

  return (
    <Container className="my-5">
      <Row>
        {productState?.map((product: Product) => (
          <div
            key={product.id}
            className="row d-flex justify-content-center px-sm-3"
          >
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <ProductImage
                src={PHOTO_URL + photoSrc}
                magnifierHeight={180}
                magnifierWidth={180}
                zoomLevel={1.3}
                className="product-detail_image mb-2"
              />
              <div className="properties pt-1 d-none d-md-block d-xl-none">
                <ProductInfoAccordion
                  features={product.explanation.features}
                  usage={product.explanation.usage}
                  nutritionalContent={product.explanation.nutritional_content}
                  gramSize={product.variants[0].size.gram}
                  totalServices={product.variants[0].size.total_services}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <ProductHeader
                name={product.name}
                slug={product.slug}
                commentCount={product.comment_count}
                tags={product.tags}
              />

              <ProductVariantSelector
                variants={product.variants}
                selectedAroma={selectedAroma}
                setSelectedAroma={setSelectedAroma}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                updatePhotoBasedOnSelection={updatePhotoBasedOnSelection}
                aromaColors={aromaColors}
              />

              <ProductPriceSection
                matchingTotalPrice={matchingTotalPrice}
                originalPrice={originalPrice}
                discountPercentage={discountPercentage}
                totalServices={totalServices}
                count={count}
                handleCountChange={handleCountChange}
                handleAddToCart={handleAddToCart}
              />

              <hr />

              <div className="properties pt-1 d-block d-md-none d-xl-block">
                <ProductInfoAccordion
                  features={product.explanation.features}
                  usage={product.explanation.usage}
                  nutritionalContent={product.explanation.nutritional_content}
                  gramSize={product.variants[0].size.gram}
                  totalServices={product.variants[0].size.total_services}
                />
              </div>
            </div>
          </div>
        ))}
      </Row>
      <Container className="my-5">
        <Row>
          <LastView />
        </Row>
      </Container>
      <Container className="mt-5">
        <ProductComment />
      </Container>
      <Container className="pb-4">
        <BestSeller best_seller={bestSeller} />
      </Container>
    </Container>
  );
}

export default ProductDetail;