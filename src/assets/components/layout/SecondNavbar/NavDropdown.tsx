import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NavDropdown.scss";

function NavDropdown() {
  const [categories, setCategories] = useState([]);
  const [hoveredLink, setHoveredLink] = useState(null);

  const Links = [
    { Link: "Protein", to: "/", category: "protein" },
    { Link: "Spor Gıdaları", to: "", category: "spor-gidalari" },
    { Link: "Tüm ürünler", to: "/products", category: "all" },
    { Link: "Saglık", to: "/", category: "saglik" },
    { Link: "Gıda", to: "/", category: "gida" },
    { Link: "Vitamin", to: "/", category: "vitamin" },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get("https://fe1111.projects.academy.onlyjs.com/api/v1/categories");
      setCategories(response.data.data.data.);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <Container fluid className="bg-dark mx-0" id="NavDropdown">
      <div className="container">
        <div className="dropdown d-flex" style={{ color: "white", height: "40px", padding: "10px" }}>
          {Links.map((link, index) => (
            <div
              key={index}
              className="dropdown-item-container"
              onMouseEnter={() => setHoveredLink(link.Link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a href={link.to} className="dropdown-item">
                {link.Link}
              </a>
              {hoveredLink === link.Link && (
                <div className="category-modal">
                  {categories.map((category) => (
                    <div key={category.id} className="category-item">
                      <h4>{category.name}</h4>
                      {category.children?.map((child) => (
                        <div key={child.id}>
                          <a href={`/category/${child.slug}`}>
                            {child.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default NavDropdown;