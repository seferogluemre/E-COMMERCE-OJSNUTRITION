import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DrawerList from "./DrawerList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./MobileSidebar.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ProductsDrawer from "./ProductsDrawer";
import { CategoriesResponseProps, CategoryProp, CategoryProps, ChildProps, MobileSidebarProps } from "./SidebarType";


function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  //State
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedSubChildren, setSelectedSubChildren] = useState<CategoriesResponseProps["subChildren"]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProp>();
  const [selectedProducts, setSelectedProducts] = useState<CategoryProps[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [subCategoryProducts, setSubCategoryProducts] = useState<ChildProps[]>([]);
  const [showSubProducts, setShowSubProducts] = useState<boolean>(false);
  const [subProductTitle, setSubProductTitle] = useState("");
  const location = useLocation();

  async function getCategories() {
    try {
      const categoriesResponse = await axios.get(
        "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
      );

      const categoriesData: CategoriesResponseProps[] =
        categoriesResponse.data.data;

      // Çocuk verilerini işleyin
      const updatedCategories = categoriesData.data?.map((item: CategoryProps) => ({
        ...item,
        subChildren: item.children?.[0]?.sub_children || [],
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
    setSelectedCategory(category); // Tüm kategori bilgilerini set ediyorsunuz
    setIsDrawerOpen(true); // Çekmeceyi açıyorsunuz
    handleClose(); // Muhtemelen başka bir UI işlemini kapatıyorsunuz
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleBackClick = () => {
    setIsDrawerOpen(false);
    handleClose();
  };
  const navigate = useNavigate();

  const handleItemClick = async (
    items: any[],
    type: "topSeller" | "sub_children" | "children",
    categoryName: string
  ) => {
    console.log("Items received:", items);
    let displayItems = [];

    switch (type) {
      case "topSeller":
        displayItems = items || [];
        break;
      case "sub_children":
        displayItems = items.map((item) => ({
          id: item.slug,
          name: item.name,
          slug: item.slug,
          order: item.order,
        }));
        break;
      case "children":
        displayItems = items;
        break;
    }

    console.log("Display Items:", displayItems);
    setSelectedProducts(displayItems);
    setProductTitle(categoryName);
    setShowProducts(true);
  };

  const handleSubCategoryClick = (items: ChildProps[], title: string) => {
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
                {categories?.map((item: CategoryProps) => (
                  <li
                    className="my-3 d-flex justify-content-between"
                    key={item.id}
                    onClick={() => handleCategoryClick(item)}
                  >
                    {item.name}
                    <span >
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
            top_sellers={selectedCategory?.top_sellers || []}
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
