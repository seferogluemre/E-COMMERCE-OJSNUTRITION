import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DrawerList from "./DrawerList";
import { FaArrowLeft } from "react-icons/fa";
import "./MobileSidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
interface MobileSidebarProps {
  show: boolean;
  handleClose: () => void;
}
function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  const [categories, setCategories] = useState([]);
  const [selectedSubChildren, setSelectedSubChildren] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function name() {
    const categoriesResponse = axios.get(
      "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
    );
    const categoriesData = (await categoriesResponse).data.data;
    // console.log(categoriesData.data[0].children[0].sub_children);
    const updatedCategories = categoriesData.data.map((item) => ({
      ...item,
      subChildren: item.children[0]?.sub_children || [],
    }));
    setCategories(updatedCategories);
  }

  useEffect(() => {
    name();
  }, []);

  const handleCategoryClick = (subChildren) => {
    setSelectedSubChildren(subChildren);
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
                    className="my-3"
                    key={item.id}
                    onClick={() => handleCategoryClick(item.subChildren)}
                  >
                    {item.name}
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
          <DrawerList subChildren={selectedSubChildren} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
