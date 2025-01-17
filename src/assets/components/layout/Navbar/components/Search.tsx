import { useSearchProduct } from '../../../../../store/products/useSearchProduct';
import './Search.scss';
import {PHOTO_URL} from '../../../../../services/api/products'

const Search = () => {
    const { products } = useSearchProduct(state => state);

    return (
        <div className="search-results">
            {products.length > 0 && (
                <div className="search-results-container">
                    {products.map((product: any) => (
                        <div key={product.id} className="search-item">
                            <div className="product-image">
                                <img src={PHOTO_URL+product.photo_src} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.slug}</p>
                            </div>
                            <div className="product-price">
                                {product.discountPrice && (
                                    <span className="original-price">{product.price} TL</span>
                                )}
                                <span className="current-price">
                                    {product.discountPrice} TL
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
