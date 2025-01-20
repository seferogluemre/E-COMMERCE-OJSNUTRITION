import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DrawerList from "./DrawerList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./MobileSidebar.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ProductsDrawer from './ProductsDrawer';

interface MobileSidebarProps {
  show: boolean;
  handleClose: () => void;
}
function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  const [categories, setCategories] = useState([]);
  const [selectedSubChildren, setSelectedSubChildren] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productTitle, setProductTitle] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [showSubProducts, setShowSubProducts] = useState(false);
  const [subProductTitle, setSubProductTitle] = useState('');
  const location = useLocation();

  async function getCategories() {
    const categoriesResponse = axios.get(
      "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
    );
    const categoriesData = (await categoriesResponse).data.data;
    // console.log(categoriesData.data[1].top_sellers);
    console.log(categoriesData.data[1].children);
    // console.log(categoriesData.data[1].children);

    const updatedCategories = categoriesData.data.map((item) => ({
      ...item,
      subChildren: item.children[0]?.sub_children || [],
    }));
    setCategories(updatedCategories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    handleClose();
    setIsDrawerOpen(false);
    setShowProducts(false);
    setShowSubProducts(false);
  }, [location]);

  const handleCategoryClick = (category) => {
    setSelectedSubChildren(category.subChildren);
    setSelectedCategory(category);
    setIsDrawerOpen(true);
    handleClose();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleBackClick = () => {
    setIsDrawerOpen(false);
    handleClose();
  };
  const navigate = useNavigate();

  const handleItemClick = async (items: any[], type: 'topSeller' | 'sub_children' | 'children', categoryName: string) => {
    console.log('Items received:', items);
    let displayItems = [];

    switch (type) {
      case 'topSeller':
        displayItems = items || [];
        break;
      case 'sub_children':
        displayItems = items.map(item => ({
          id: item.slug,
          name: item.name,
          slug: item.slug,
          order: item.order
        }));
        break;
      case 'children':
        displayItems = items;
        break;
    }

    console.log('Display Items:', displayItems);
    setSelectedProducts(displayItems);
    setProductTitle(categoryName);
    setShowProducts(true);
  };

  const handleSubCategoryClick = (items: any[], title: string) => {
    setSubCategoryProducts(items);
    setSubProductTitle(title);
    setShowSubProducts(true);
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src="/assets/Logo1.png" width={150} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column p-0">
          <div className="p-3">
            <ul className="list-unstyled">
              <p className="fs-3 text-black">
                {categories?.map((item) => (
                  <li
                    className="my-3 d-flex justify-content-between"
                    key={item.id}
                    onClick={() => handleCategoryClick(item)}
                  >
                    {item.name}
                    <span className="">
                      <FaArrowRight />
                    </span>
                  </li>
                ))}
                <li onClick={() => navigate("/products")}>Tüm Ürünler</li>
              </p>
            </ul>
          </div>
          <div className="mt-2 p-3 bg-body-tertiary h-100 mobile-sidebar-bottom-links">
            <ul className="list-unstyled d-flex flex-column row-gap-2">
              <li>
                <NavLink
                  to={"/account"}
                  className="text-decoration-none text-black"
                >
                  Hesabım
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className="text-decoration-none text-black"
                >
                  Müşteri yorumları
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="text-decoration-none text-black"
                >
                  İletişim
                </NavLink>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={isDrawerOpen} onHide={handleDrawerClose}>
        <Offcanvas.Header closeButton>
          <button
            onClick={handleBackClick}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaArrowLeft />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DrawerList
            subChildren={selectedSubChildren}
            topSellers={selectedCategory?.top_sellers || []}
            children={selectedCategory?.children || []}
            onItemClick={handleItemClick}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <ProductsDrawer
        show={showProducts}
        onHide={() => setShowProducts(false)}
        items={selectedProducts}
        title={productTitle}
        onSubCategoryClick={handleSubCategoryClick}
      />

      <ProductsDrawer
        show={showSubProducts}
        onHide={() => setShowSubProducts(false)}
        items={subCategoryProducts}
        title={subProductTitle}
      />
    </>
  );
}

export default MobileSidebar;
