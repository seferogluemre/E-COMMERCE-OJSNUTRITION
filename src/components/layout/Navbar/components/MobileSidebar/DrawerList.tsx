import { FaArrowRight } from "react-icons/fa";
import { CategoriesResponseProps } from "../../../../../types/SidebarTypes";
function DrawerList({
  subChildren,
  top_sellers,
  children,
  onItemClick,
}: CategoriesResponseProps) {
  return (
    <div>
      {top_sellers && top_sellers.length > 0 && (
        <div
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(top_sellers, "topSeller", "Çok Satanlar")}
        >
          <h3 className="m-0">Çok Satanlar</h3>
          <FaArrowRight />
        </div>
      )}

      {subChildren && subChildren.length > 0 && (
        <div
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(subChildren, "sub_children", "Ürünler")}
        >
          <h3 className="m-0">Ürünler</h3>
          <FaArrowRight />
        </div>
      )}

      {children && children.length > 0 && (
        <div
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(children, "children", "Kategoriler")}
        >
          <h3 className="m-0">Kategoriler</h3>
          <FaArrowRight />
        </div>
      )}
    </div>
  );
}

export default DrawerList;
