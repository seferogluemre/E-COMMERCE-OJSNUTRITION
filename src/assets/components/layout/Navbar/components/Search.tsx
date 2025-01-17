import { useSearchProduct } from '../../../../../store/products/useSearchProduct';
import './Search.scss';
import { PHOTO_URL } from '../../../../../services/api/products'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Search = () => {
    const { products, setProducts } = useSearchProduct(state => state);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setProducts([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setProducts]);

    return (
        <div className="search-results" ref={searchRef}>
            {products.length > 0 && (
                <div className="search-results-container">
                    {products.map((product: any) => (
                        <div key={product.id} className="search-item" onClick={() => navigate(`products/${product.slug}`)}>
                            <div className="product-image">
                                <img src={PHOTO_URL + product.photo_src} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.slug}</p>
                            </div>
                            <div className="product-price">
                                {product.discountPrice && (
                                    <span className="original-price">{product.price_info.total_price} TL</span>
                                )}
                                <span className="current-price">
                                    {product.discountPrice || product.price_info.total_price} TL
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
