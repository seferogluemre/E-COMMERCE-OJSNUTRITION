import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NavDropdown.scss";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa'
import { PHOTO_URL } from "../../../services/api/collections/Auth";
import { Category, LinksProps } from "../../../types/NavTypes";
import { Child, SubChild } from "../../../types/SidebarTypes";

function NavDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const Links: LinksProps[] = [
    { Link: "Protein", to: "/products", category: "protein" },
    { Link: "Spor Gıdaları", to: "/products", category: "spor-gidalari" },
    { Link: "Saglık", to: "/products", category: "saglik" },
    { Link: "Gıda", to: "/products", category: "gida" },
    { Link: "Vitamin", to: "/products", category: "vitamin" },
    { Link: "Tüm ürünler", to: "/products", category: "all" },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
      );
      setCategories(response.data.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const getCategoryBySlug = (slug: string) => {
    if (slug === "all") {
      setHoveredLink(null)
    }
    console.log(categories.find((cat) => cat.slug === slug));
    return categories.find((cat) => cat.slug === slug);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHoveredLink(null);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container fluid className="bg-dark mx-0" id="NavDropdown">
      <div className="container">
        <div
          className="dropdown d-flex align-items-center justify-content-center column-gap-5"
          style={{ color: "white", height: "40px", padding: "10px" }}
        >
          {Links.map((link, index) => (
            <div
              key={index}
              className="dropdown-item-container"
              onMouseEnter={() => setHoveredLink(link.Link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a href={link.to} className="dropdown-item">
                {link.Link}
                <FaAngleDown className="arrow-down" />
              </a>
              {hoveredLink === link.Link && (
                <div className="category-modal">
                  <div className="categories-section">
                    {getCategoryBySlug(
                      link.category.toLowerCase()
                    )?.children.map((child: Child) => (
                      <div key={child.id} className="category-item">
                        <h4>{child.name}</h4>
                        <div className="sub-items">
                          {child.sub_children
                            ?.slice(0, 7)
                            .map((subChild: SubChild, idx: number) => (
                              <NavLink
                                key={idx}
                                to={`/products/${subChild.slug}`}
                                className="category-link"
                              >
                                {subChild.name}
                              </NavLink>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="top-sellers">
                    <h4>En Çok Satanlar</h4>
                    {getCategoryBySlug(
                      link.category.toLowerCase()
                    )?.top_sellers.map((seller, idx) => (
                      <NavLink
                        to={`/products/${seller.slug}`}
                        className="text-decoration-none"
                        key={idx}
                      >
                        <div key={idx} className="top-seller-item">
                          <img
                            src={PHOTO_URL + seller.picture_src}
                            alt={seller.name}
                          />
                          <div className="seller-info ">
                            <h5>{seller.name}</h5>
                            <p>{seller.description}</p>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
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