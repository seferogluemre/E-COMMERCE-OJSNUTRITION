import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DrawerList from "./DrawerList";
import { FaArrowLeft } from "react-icons/fa";

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

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src="/assets/Logo1.png" width={150} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <div className="">
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
              </p>
            </ul>
          </div>
          <div className="bg-secondary position-absolute bottom-0">
            <ul className="list-unstyled">
              <li>İletişim</li>
              <li>Sıkça Sorulan Sorular</li>
              <li>Giriş yap</li>
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
