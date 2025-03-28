import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DrawerList from "./DrawerList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./MobileSidebar.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ProductsDrawer from "./ProductsDrawer";

import { isAuthenticated } from "../../../../../services/api/collections/Auth";
import {
  getAuthUser,
  removeTokenAndAuthUser,
} from "../../../../../services/api/collections/Storage";
import { useToastStore } from "../../../../../store/toast/ToastStore";
import { CategoriesResponseProps, CategoryProp, CategoryProps, ChildProps, MobileSidebarProps } from "../../../../../types/SidebarTypes";

function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  const user = getAuthUser() ? JSON.parse(getAuthUser()!) : null;
  const authenticated = isAuthenticated();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedSubChildren, setSelectedSubChildren] = useState<
    CategoriesResponseProps["subChildren"]
  >([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProp>();
  const [selectedProducts, setSelectedProducts] = useState<CategoryProps[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [subCategoryProducts, setSubCategoryProducts] = useState<ChildProps[]>(
    []
  );
  const [showSubProducts, setShowSubProducts] = useState<boolean>(false);
  const [subProductTitle, setSubProductTitle] = useState("");
  const location = useLocation();

  async function getCategories() {
    try {
      const categoriesResponse = await axios.get(
        "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
      );

      const categoriesData = categoriesResponse.data?.data?.data;

      if (Array.isArray(categoriesData)) {
        const updatedCategories = categoriesData.map((item: CategoryProps) => ({
          ...item,
          subChildren: item.children?.[0]?.sub_children || [],
        }));
        setCategories(updatedCategories);
      } else {
        console.error("Categories data is not in expected format");
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
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

  const handleCategoryClick = (category: CategoryProp) => {
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

  const handleLogout = () => {
    removeTokenAndAuthUser();
    useToastStore.getState().showToast("Çıkış yapıldı", "success");
    navigate("/");
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
                    onClick={() => handleCategoryClick(item as CategoryProp)}
                  >
                    {item.name}
                    <span>
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
              {authenticated && user ? (
                <>
                  <li>
                    <NavLink
                      to="/account"
                      className="text-decoration-none text-black"
                    >
                      Hesabım
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-decoration-none text-black border-0 bg-transparent"
                    >
                      Çıkış Yap
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="text-decoration-none text-black"
                    >
                      Üye Girişi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="text-decoration-none text-black"
                    >
                      Üye Ol
                    </NavLink>
                  </li>
                </>
              )}
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
