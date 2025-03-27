import FiveStar from "../../../components/FiveStars/FiveStar";

interface ProductHeaderProps {
    name: string;
    slug: string;
    commentCount: number;
    tags: string[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
    name,
    slug,
    commentCount,
    tags,
}) => {
    return (
        <>
            <h1 className="fs-2 m-0 pt-md-3">{name}</h1>
            <p className="m-1">{slug}</p>
            <div className="d-flex column-gap-2 ">
                <span>
                    <FiveStar />
                </span>
                <p>{commentCount} Yorum</p>
            </div>
            <div className="product-tags-container">
                <div className="d-flex column-gap-2">
                    {tags.map((tag, index) => (
                        <div className="product-detail_tag" key={index}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </>
    );
};

export default ProductHeader;
