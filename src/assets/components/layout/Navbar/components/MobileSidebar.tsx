import axios from "axios";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
interface MobileSidebarProps {
  show: boolean;
  handleClose: () => void;
}
function MobileSidebar({ show, handleClose }: MobileSidebarProps) {
  const [categories, setCategories] = useState([]);

  async function name() {
    const categoriesResponse = axios.get(
      "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
    );
    const categoriesData = (await categoriesResponse).data.data;
    setCategories(categoriesData.data);
  }

  useEffect(() => {
    name();
  }, [categories]);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <p className="fs-3 text-black">
              {categories?.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </p>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSidebar;
